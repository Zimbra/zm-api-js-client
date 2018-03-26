import { Entity } from '.';

export type RenamedKey = string;
export type RenamedEntity = [string, Entity];
export type EntityMappingValue = RenamedKey | RenamedEntity | Entity | {};

export interface EntityMapping {
	[key: string]: EntityMappingValue;
}

export interface NormalizedKey {
	key: string;
	nestedSchema?: Entity;
}
