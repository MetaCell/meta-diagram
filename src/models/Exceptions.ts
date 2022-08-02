export class UnknownParent extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, UnknownParent.prototype);
    }
}