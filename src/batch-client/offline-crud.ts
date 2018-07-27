import { ItemAttributes } from './types';
function debug(...args: any[]) {
	console.info('[OfflineCRUD]:', ...args);
}

function setAttributes(node: any, attrs: ItemAttributes) {
	for (let key in attrs) {
		node.setAttribute(key, attrs[key]);
	}
}

// TODO: Handle Children
export default function createOfflineCRUD(/* options?: any */) {
	const doc = new DOMParser().parseFromString(
		'<notify></notify>',
		'application/xml'
	);

	const notify = <HTMLElement>doc.querySelector('notify');

	const api = {
		create(tagName: string, attributes: ItemAttributes) {
			let created =
				notify.querySelector('created') ||
				notify.appendChild(doc.createElement('created'));

			let tag = document.createElement(tagName);
			setAttributes(tag, attributes);
			created.appendChild(tag);

			debug(`<created ${tagName}[id="${attributes.id}"]>`);
			return api;
		},
		delete(tagName: string, attributes: ItemAttributes) {
			let deleted =
				notify.querySelector('deleted') ||
				notify.appendChild(doc.createElement('deleted'));
			let createdTag = notify.querySelector(
				`created ${tagName}[id="${attributes.id}"]`
			);

			if (createdTag) {
				const created = <HTMLElement>notify.querySelector('created');
				created.removeChild(createdTag);

				debug(`removing <created ${tagName}[id="${attributes.id}"]>`);
			} else {
				// Create <deleted>
				let tag = document.createElement(tagName);
				setAttributes(tag, attributes);
				deleted.appendChild(tag);

				debug(`<deleted ${tagName}[id="${attributes.id}"]>`);
			}

			return api;
		},
		modify(tagName: string, attributes: ItemAttributes) {
			let modified =
				notify.querySelector('modified') ||
				notify.appendChild(doc.createElement('modified'));

			let tag = document.createElement(tagName);
			setAttributes(tag, attributes);
			modified.appendChild(tag);

			debug(`<modified ${tagName}[id="${attributes.id}"]>`);
			return api;
		},
		reset() {
			notify.innerHTML = '';
			return api;
		},
		toString() {
			return notify.outerHTML;
		}
	};

	return api;
}

/**
 * create/delete/modify for serializing operations supported in Offline mode.
 *
 * <example>
 * create('folder', { id: 1, owner: 'john@example.com' })
 */
