import reduce from 'lodash/reduce';

import { EntityMapping, EntityMappingValue, NormalizedKey } from './types';

function normalizeKey(
	key: string,
	schema: Entity,
	inverse: Boolean = false
): NormalizedKey {
	const getKey = inverse ? schema.inverseKey : schema.key;
	const schemaValue = getKey(key);

	if (typeof schemaValue === 'string') {
		return { key: schemaValue };
	}
	if (Array.isArray(schemaValue)) {
		return { key: schemaValue[0] as string, nestedSchema: schemaValue[1] };
	}
	if (schemaValue instanceof Entity) {
		return { key, nestedSchema: schemaValue };
	}

	return { key };
}

function _normalize(data: {}, schema: Entity, inverse: Boolean = false) {
	return reduce(
		data,
		(result: { [key: string]: any }, v, k) => {
			const { key, nestedSchema } = normalizeKey(k, schema, inverse);
			const type = typeof v;
			if (Array.isArray(v)) {
				result[key] = (v as Array<any>).map(i =>
					nestedSchema ? _normalize(i, nestedSchema, inverse) : i
				);
			} else if (type === 'object' && v !== null) {
				result[key] = nestedSchema ? _normalize(v, nestedSchema, inverse) : v;
			} else {
				result[key] = v;
			}
			return result;
		},
		{}
	);
}

/**
 * An Entity provides a simple object key mapping from one representation
 * to another.
 *
 * 	const SubResource = new Entity({
 * 		f: 'fuu',
 * 		bar: 'bar',
 * 	});
 *
 * 	const Resource = new Entity({
 * 		k: ['moreDescriptiveKey', SubResource]
 * 	});
 *
 * 	normalize(incomingData, Resource);
 * 	denormalize(outgoingData, Resource);
 */
export class Entity {
	private inverseMapping: EntityMapping = {};
	private mapping: EntityMapping = {};

	constructor(mapping: EntityMapping) {
		this.addMapping(mapping);
		this.key = this.key.bind(this);
		this.inverseKey = this.inverseKey.bind(this);
	}

	public addMapping(mapping: EntityMapping) {
		this.mapping = {
			...this.mapping,
			...mapping
		};
		this.inverseMapping = this.initInverseMapping(this.mapping);
	}

	initInverseMapping(mapping: EntityMapping, accumulator = {}) {
		return reduce(
			mapping,
			(result: EntityMapping, v: any, k) => {
				if (Array.isArray(v)) {
					result[v[0]] = [k, v[1]];
				} else if (typeof v === 'object' && !(v instanceof Entity)) {
					result[k] = this.initInverseMapping(v) as EntityMappingValue;
				} else if (typeof v === 'string') {
					result[v] = k;
				} else {
					result[k] = v;
				}

				return result;
			},
			accumulator
		);
	}

	public inverseKey(k: string) {
		return this.inverseMapping[k];
	}

	public key(k: string) {
		return this.mapping[k];
	}
}

export function normalize(
	schema: Entity
): (data: any | Array<any>) => any | Array<any> {
	return function (data) {
		return Array.isArray(data)
			? data.map(v => _normalize(v, schema))
			: _normalize(data, schema);
	};
}

export function denormalize(
	schema: Entity
): (data: any | Array<any>) => any | Array<any> {
	return function (data) {
		return Array.isArray(data)
			? data.map(v => _normalize(v, schema, true))
			: _normalize(data, schema, true);
	};
}
