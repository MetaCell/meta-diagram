import { Point } from '@projectstorm/geometry';

export function subPoints(point1: Point, point2: Point) {
  return new Point(point1.x - point2.x, point1.y - point2.y);
}
