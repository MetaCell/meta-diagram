export declare class Position {
    private _x;
    private _y;
    constructor(x: number, y: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    add(otherPosition: Position): Position;
    sub(otherPosition: Position): Position;
}
