export declare class Position {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(otherPosition: Position): Position;
    sub(otherPosition: Position): Position;
    log(): void;
}
