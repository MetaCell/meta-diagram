import { Point } from "@projectstorm/geometry";

export class BoundingBox {
    private _left: number
    private _top: number
    private _right: number
    private _bottom: number

    constructor(left: number, top: number, right: number, bottom: number) {
        this._left = left;
        this._top = top;
        this._right = right;
        this._bottom = bottom;
    }

    // @ts-ignore
    get left(): number {
        return this._left;
    }
    // @ts-ignore
    set left(value: number) {
        this._left = value;
    }
    // @ts-ignore
    get top(): number {
        return this._top;
    }

    // @ts-ignore
    set top(value: number) {
        this._top = value;
    }

    // @ts-ignore
    get right(): number {
        return this._right;
    }

    // @ts-ignore
    set right(value: number) {
        this._right = value;
    }

    // @ts-ignore
    get bottom(): number {
        return this._bottom;
    }

    // @ts-ignore
    set bottom(value: number) {
        this._bottom = value;
    }

    getWidth() : number {
        return this._right - this._left
    }

    getHeight() : number {
        return this._top - this._bottom
    }

    containsPoint(points?: Point, x?: number, y?: number): boolean {
        if (points) {
            if (points.x >= this._left && points.x <= this._right && points.y >= this._top && points.x <= this._bottom) {
                return true;
            }
        } else if (x && y) {
            if (x >= this._left && x <= this._right && y >= this._top && x <= this._bottom) {
                return true;
            }
        }
        return false;
    }
}
