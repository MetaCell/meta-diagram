export class UnknownParent extends Error {
    constructor(id: string | undefined) {
        const msg = `Root with id ${id} not found`
        super(msg);
        Object.setPrototypeOf(this, UnknownParent.prototype);
    }
}