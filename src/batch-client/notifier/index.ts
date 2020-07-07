import emitter from 'mitt';

export class Notifier {
	private emitter: any;
	private eventName: string = 'notify';
	private sequenceNo: number = 0;
	private processedSequences = new Map();

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

	public setSequenceNumber = (number: number) => (this.sequenceNo = number);

	/**
	 * Receives the notification object to be emitted
	 * @param {Object} notifications Notification object to be handled
	 */
	public handleNotifications = (notifications: any) => {
		// update the sequence number
		if (notifications && notifications.seq && !this.processedSequences.has(notifications.seq)) {
			if (notifications.seq > this.sequenceNo) {
				this.sequenceNo = notifications.seq;
			}
			this.processedSequences.set(notifications.seq, true);
			// emit the notifications on the emitter which can be handled by the calling client
			this.emitter && this.emitter.emit(this.eventName, notifications);
		}

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
}
