import emitter from 'mitt';

export class Notifier {
	private emitter: any;
	private eventName: string = 'notify';
	private processedSequences = new Map();
	private sequenceNo: number = 0;

	constructor() {
		this.emitter = new (emitter as any)();
	}

	/**
	 * Registers the handlers to the notify event
	 * @param {Function} handler a handler to be registered
	 */
	public addHandler = (handler: Function) => {
		if (handler) {
			this.emitter.on(this.eventName, handler);
		}
	};

	public getSequenceNumber = () => this.sequenceNo;

	/**
	 * Receives the notification object to be emitted
	 * @param {Object} notifications Notification object to be handled
	 */
	public handleNotifications = (notifications: any) => {
		// update the sequence number
		if (
			notifications &&
			notifications.seq &&
			!this.processedSequences.has(notifications.seq)
		) {
			if (notifications.seq > this.sequenceNo) {
				this.sequenceNo = notifications.seq;
			}
			this.processedSequences.set(notifications.seq, true);
			// emit the notifications on the emitter which can be handled by the calling client
			this.emitter && this.emitter.emit(this.eventName, notifications);
		}
	};

	/**
	 * Resets the sequence and processed notifications data upon refresh
	 * @param {Object} refresh refresh data object returned by the server
	 */
	public handleRefresh = (refresh: any) => {
		console.info('[Cache] refresh received', refresh, new Date());
		this.sequenceNo = 0;
		this.processedSequences.clear();
	};

	/**
	 * Removes the handler from the emitter
	 * @param {Function} handler Handler to be removed
	 */
	public removeHandler = (handler: Function) => {
		if (handler) {
			this.emitter.off(this.eventName, handler);
		}
	};

	public setSequenceNumber = (number: number) => (this.sequenceNo = number);
}
