export class Position {

  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  // @ts-ignore
  get x(): number {
    return this._x;
  }

  // @ts-ignore
  set x(value: number) {
    this._x = value;
  }

  // @ts-ignore
  get y(): number {
    return this._y;
  }

  // @ts-ignore
  set y(value: number) {
    this._y = value;
  }

  add(otherPosition: Position) : Position {
    return new Position(this._x+ otherPosition._x, this._y + otherPosition._y)
  }

  sub(otherPosition: Position) : Position {
    return new Position(this._x - otherPosition._x, this._y - otherPosition._y)
  }

}
