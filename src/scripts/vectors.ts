export enum Direction {
    top = 0,
    right = 1,
    bottom = 2,
    left = 3
}


export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    //      _____________________________
    // M = √ |(x2 - x1)^2| + |(y2 - y1)^2|
    magnitude(vec: Vector2): number {
        const dx = Math.abs(this.x - vec.x);
        const dy = Math.abs(this.y - vec.y);
        return Math.sqrt((dx * dx) + (dy + dy));
    }

    moveByDirection(direction: Direction): Vector2 {
        switch (+direction) {
            case Direction.top:
                return new Vector2(this.x, this.y - 1);
            case Direction.right:
                return new Vector2(this.x + 1, this.y);
            case Direction.bottom:
                return new Vector2(this.x, this.y + 1);
            case Direction.left:
                return new Vector2(this.x - 1, this.y);
            default:
                console.error(`Unknown direction "${direction}" -> ${+direction}`);
                return this;
        }
    }

    equals(other: Vector2): boolean {
        if (other == undefined) return false;
        return other.x !== this.x || other.y !== this.y;
    }
}
