export class DedupedByQueueError extends Error {
	constructor() {
		super('Operation was deduplicated by offline-queue-link.');
		Object.defineProperty(this, 'name', { value: 'DedupedByQueueError' });
	}
}
