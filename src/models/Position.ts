export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(otherPosition: Position) : Position {
    return new Position(this.x+ otherPosition.x, this.y + otherPosition.y)
  }

  sub(otherPosition: Position) : Position {
    return new Position(this.x - otherPosition.x, this.y - otherPosition.y)
  }
}
