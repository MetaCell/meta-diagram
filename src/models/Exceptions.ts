export class UnknownParent extends Error {
    constructor(id: string) {
        const msg = `Graph with id ${id} not found`
        super(msg);
        Object.setPrototypeOf(this, UnknownParent.prototype);
    }
}