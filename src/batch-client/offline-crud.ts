import { JsonRequestOptions } from '../request/types';

/**
 * @private
 * consolidate create/delete/modify for operations supported in Offline mode.
 *
 * <example>
 * create('folder', { id: 1, owner: 'john@example.com' })
 */
function createOfflineCrud() {
	let operations: any = {};

	function getKey(op: string, attributes: any) {
		return `${op}:${attributes.id || Date.now()}`;
	}

	function getKeys(attributes: any) {
		return {
			createKey: getKey('create', attributes),
			modifyKey: getKey('modify', attributes),
			deleteKey: getKey('delete', attributes)
		};
	}

	const api = {
		create(options: JsonRequestOptions) {
			const { createKey, deleteKey } = getKeys(options);

			// if deleted, remove from deleted
			if (deleteKey in operations) {
				delete operations[deleteKey];
			}

			operations[createKey] = options;
		},
		delete(options: JsonRequestOptions) {
			const { createKey, modifyKey, deleteKey } = getKeys(options);

			// if created or modified, remove from created or modified
			if (createKey in operations) {
				delete operations[createKey];
			}
			if (modifyKey in operations) {
				delete operations[modifyKey];
			}

			operations[deleteKey] = options;
		},
		modify(options: JsonRequestOptions) {
			const { createKey, modifyKey, deleteKey } = getKeys(options);

			// if created, consolidate changes into the created item... (hard)
			if (createKey in operations) {
				console.log('modifying a created entity is difficult?');
			}

			// if deleted, should the modification un-delete?
			if (deleteKey in operations) {
				delete operations[deleteKey];
			}

			operations[modifyKey] = options;
		},
		reset() {
			operations = {};
		},
		get operations() {
			return operations;
		}
	};
	return api;
}

/**
 * @public
 */
export function createOfflineJSONRequestQueue(/* options */) {
	const crud = createOfflineCrud();

	const api = {
		consume() {
			const { operations } = crud;
			crud.reset();
			console.log('Consuming operations:', operations);
			return Object.keys(operations).map(key => operations[key]);
		},
		push(options: JsonRequestOptions) {
			//			if (!options.body.id) {
			//				options.body.id = String(Date.now())
			//			}

			switch (options.name) {
				case 'SendInviteReply':
					crud.modify(options);
					break;
				case 'SaveDraft':
					crud.create(options);
					break;
				case 'SendMsg':
					crud.create(options);
					break;
			}
		}
	};

	return api;
}
