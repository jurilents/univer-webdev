// True typescript file imports
import {Direction, Vector2} from './vectors';

enum CellContent {
    empty = 0,
    border = 1,
    snake = 2,
    food = 3,
    diamond = 4
}


class Cell {
    private _content: CellContent;
    private _object: IPlaceable;

    constructor() {
        this.reset();
    }

    get content(): CellContent {
        return this._content;
    }

    set object(obj: IPlaceable) {
        this._content = obj.content;
        this._object = obj;
        console.log(obj);
    }

    reset(): void {
        this._content = CellContent.empty;
        this._object = undefined;
    }

    notEmpty(): boolean {
        return this._content !== CellContent.empty;
    }
}


interface IPlaceable {
    content: CellContent;
    image: any;
    cost: number;
    spawnRate: number;
}

function randomIndex<T>(array: T[]): number {
    if (array) return Math.floor(Math.random() * array.length);
    else return undefined;
}

function randomArrayItem<T>(array: T[]): T {
    if (!array) return undefined;
    return array[randomIndex(array)];
}

function randomEnumItem<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
    return randomArrayItem(enumValues);
}


interface IGameOptions {
    canvasId: string;
    gridSize: Vector2;

    food: Food[];
    maxFoodCount: number;
    foodSpawnChance: number;

    diamond: Diamond;
    maxDiamondsCount: number;
    diamondSpawnChance: number;
}

class Game {
    public currentMousePosition: Vector2;
    public previousMouseCell: Vector2;
    public currentMouseCell: Vector2;
    public speed: number;

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly cellsCount: number;
    private gridSize: Vector2;
    private cellSize: number;

    private readonly grid: Cell[][];
    private readonly snakes: Snake[];
    private interval: any;

    private food: Food[];
    private maxFoodCount: number;
    private foodSpawnChance: number;
    public currentFoodCount: number;

    private diamond: Diamond;
    private maxDiamondsCount: number;
    private diamondSpawnChance: number;
    public currentDiamondCount: number;


    constructor(opts: IGameOptions) {
        this.canvas = document.getElementById(opts['canvasId']) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.gridSize = opts['gridSize'];
        this.cellsCount = this.gridSize.x * this.gridSize.y;
        this.snakes = [];

        this.grid = [];
        for (let y = 0; y < this.gridSize.y; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.gridSize.x; x++) {
                this.grid[y][x] = new Cell();
            }
        }

        this.resizeCanvas(500, 500);
        this.speed = 1;

        this.maxFoodCount = opts['maxFoodCount'];
        this.foodSpawnChance = opts['foodSpawnChance'];
        this.food = opts['food'];
        if (!this.food) console.error('Food not defined!');
        this.currentFoodCount = 0;

        this.maxDiamondsCount = opts['maxDiamondsCount'];
        this.diamondSpawnChance = opts['diamondSpawnChance'];
        this.diamond = opts['diamond'];
        if (!this.diamond) console.error('Diamond not defined!');
        this.currentDiamondCount = 0;

        window.onmousemove = e => {
            const eventFunc = (canvas: HTMLCanvasElement) => {
                const r = canvas.getBoundingClientRect() as DOMRect;
                this.currentMousePosition = new Vector2(
                    (e.clientX - r.left) / (r.right - r.left) * canvas.width,
                    (e.clientY - r.top) / (r.bottom - r.top) * canvas.height
                );

                const currentCell = new Vector2(
                    Math.floor(this.currentMousePosition.x / this.cellSize),
                    Math.floor(this.currentMousePosition.y / this.cellSize)
                );

                if (!this.isInsideBounds(currentCell)) return;
                this.currentMouseCell = currentCell;

                if (this.previousMouseCell == undefined ||
                    this.currentMouseCell.equals(this.previousMouseCell)) {
                    this.previousMouseCell = this.currentMouseCell;
                    this.onCellHover();
                }
            };
            eventFunc(this.canvas);
        };
    }


    public play(): void {
        console.log('Game started.');

        this.interval = setInterval(() => {
            for (const snake of this.snakes) {
                snake.onStep();

                if (this.currentFoodCount < this.maxFoodCount) {
                    const randomFood = randomArrayItem(this.food);
                    if (this.currentFoodCount == 0 ||
                        randomFood.spawnRate > Math.random()) {
                        this.spawn(randomFood);
                        this.currentFoodCount++;
                    }
                } else console.log('currentFoodCount < maxFoodCount: ', this.currentFoodCount, this.maxFoodCount);
            }
        }, 1000 / this.speed);
    }

    public pause(): void {
        console.log('Game paused.');

        clearInterval(this.interval);
    }


    public spawn(obj: IPlaceable, pos: Vector2 = null): void {
        if (obj.content === CellContent.snake) {
            console.error('Do not use "spawn" method to spawn snakes.' +
                ' You should use special "spawnSnake" method.');
            return;
        }
        if (pos == null) pos = this.randomEmptyCell();
        if (pos == null) console.error('Cannot find empty cell :(');
        this.setCell(pos, obj);
    }

    public spawnSnake(snake: Snake): boolean {
        for (const segment of snake.segments) {
            if (this.getCell(segment.position).notEmpty()) {
                return false;
            }
        }

        this.snakes.push(snake);
        for (const segment of snake.segments) {
            this.setCell(segment.position, segment);
        }
        return true;
    }

    public randomEmptyCell(): Vector2 {
        let i = 0;
        let cell: Vector2 = null;

        do {
            const y = randomIndex(this.grid);
            cell = new Vector2(y, randomIndex(this.grid[y]));
        } while (i++ < this.cellsCount * 0.2 &&
        this.getCell(cell).notEmpty());

        if (this.getCell(cell).notEmpty()) return null;
        return cell;
    }

    public getCell(pos: Vector2): Cell {
        if (this.isInsideBounds(pos)) return this.grid[pos.y][pos.x];
    }

    public setCell(pos: Vector2, obj: IPlaceable): void {
        if (obj.image) this.drawImage(pos, obj.image);
        else this.fill(pos);
        if (this.isInsideBounds(pos)) this.grid[pos.y][pos.x].object = obj;
    }

    public setFillStyle(color: string): void {
        this.ctx.fillStyle = color;
    }

    public fill(pos: Vector2, color = null): void {
        if (color !== null) this.setFillStyle(color);
        this.ctx.fillRect(
            this.cellSize * pos.x, this.cellSize * pos.y,
            this.cellSize, this.cellSize);
    }

    public drawImage(pos: Vector2, image: CanvasImageSource) {
        if (image == null) console.warn('Image source not defined.');
        console.log(pos, ' image: ', image);
        this.ctx.drawImage(image,
            this.cellSize * pos.x, this.cellSize * pos.y,
            this.cellSize, this.cellSize);
    }

    public clear(pos: Vector2 = null): void {
        if (pos == null) this.ctx.clearRect(0, 0,
            this.canvas.width, this.canvas.height);
        else {
            this.ctx.clearRect(
                this.cellSize * pos.x, this.cellSize * pos.y,
                this.cellSize, this.cellSize);
            this.grid[pos.y][pos.x].reset();
        }
    }

    public isInsideBounds(pos: Vector2): boolean {
        if (pos == undefined) return false;
        return pos.x >= 0 && pos.x < this.gridSize.x
            && pos.y >= 0 && pos.y < this.gridSize.y;
    }

    public returnInsideBounds(pos: Vector2) {
        let x: number, y: number;

        if (pos.x < 0) x = this.gridSize.x - 1;
        else if (pos.x >= this.gridSize.x) x = 0;
        else x = pos.x;

        if (pos.y < 0) y = this.gridSize.y - 1;
        else if (pos.y >= this.gridSize.y) y = 0;
        else y = pos.y;

        return new Vector2(x, y);
    }

    public onCellHover(): void {
    }

    private resizeCanvas(w: number, h: number) {
        const ratio = ((ctx: any) => {
            const dpr = window.devicePixelRatio || 1;
            const bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;

            return dpr / bsr;
        })(this.ctx);

        this.canvas.width = w * ratio;
        this.canvas.height = h * ratio;
        this.canvas.style.width = w + "px";
        this.canvas.style.height = h + "px";

        this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.cellSize = Math.min(
            this.canvas.width / this.gridSize.x,
            this.canvas.height / this.gridSize.y);
    }
}


class Food implements IPlaceable {
    public content: CellContent;
    public spawnRate: number;

    public cost: number;
    public image: any;

    constructor(image: string, cost: number) {
        if (typeof image == 'string') {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                this.image = img;
            }
        }
        this.cost = cost;
        this.content = CellContent.food;
    }
}

class Diamond implements IPlaceable {
    public content: CellContent;
    public spawnRate: number;

    public cost: number;
    public image: any;

    constructor(image: string, cost: number) {
        if (typeof image == 'string') {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                this.image = img;
            }
        }
        this.cost = cost;
        this.content = CellContent.diamond;
    }
}


class SnakeSegment implements IPlaceable {
    public content: CellContent;
    public image: any;
    public position: Vector2;
    public snake: Snake;

    constructor(snake: Snake, pos: Vector2) {
        this.content = CellContent.snake;
        this.position = pos;
        this.snake = snake;
    }

    cost: number;
    spawnRate: number;
}


class Snake {
    public readonly segments: SnakeSegment[];
    private readonly game: Game;
    private direction: Direction;
    private inputDirection: Direction;
    private score: number;

    constructor(game: Game, length = 1, headPos: Vector2 = undefined,
                direction: Direction = undefined) {
        if (headPos == undefined) headPos = game.randomEmptyCell();
        if (length <= 0) length = 1;

        this.game = game;
        this.score = 0;

        this.direction = direction || randomEnumItem(Direction);
        this.segments = new Array(length);
        for (let i = 0; i < length; i++) {
            let pos = headPos.moveByDirection(this.direction);
            if (!this.game.isInsideBounds(pos))
                pos = this.game.returnInsideBounds(pos);

            this.game.fill(pos);
            this.segments[i] = new SnakeSegment(this, pos);
        }

        game.spawnSnake(this);

        window.onkeydown = (e: KeyboardEvent) => {
            if (e.repeat) return;

            // console.log(e.key);

            switch (e.key) {
                case "w":
                case "ArrowUp":
                case "Up":
                    this.inputDirection = Direction.top;
                    break;

                case "a":
                case "ArrowLeft":
                case "Left":
                    this.inputDirection = Direction.left;
                    break;

                case "s":
                case "ArrowDown":
                case "Down":
                    this.inputDirection = Direction.bottom;
                    break;

                case "d":
                case "ArrowRight":
                case "Right":
                    this.inputDirection = Direction.right;
                    break;
            }
        }
    }

    public onStep() {
        if (this.inputDirection == undefined ||
            this.inputDirection === this.reverseDirection()) return;

        let newHead = this.segments[0].position.moveByDirection(this.inputDirection);
        if (!this.game.isInsideBounds(newHead))
            newHead = this.game.returnInsideBounds(newHead);

        this.moveTo(newHead);

        this.direction = this.inputDirection;
    }

    private moveTo(newHead: Vector2): void {
        const last: SnakeSegment = this.cutFromTail()[0];
        last.position = newHead;
        this.segments.unshift(last);

        const cell = this.game.getCell(newHead);
        switch (cell.content) {
            case CellContent.snake:
            case CellContent.border:
                this.game.pause();
                break;

            case CellContent.food:
            case CellContent.diamond:
                this.score += cell.object.cost;
                displaySore(this.score);
                break;

            default:
                this.game.setCell(newHead, last);
                break;

        }
    }

    private cutFromTail(tailLength = 1): SnakeSegment[] {
        const tail: SnakeSegment[] = [];
        for (let i = 0; i < tailLength && i < this.segments.length; i++) {
            const tailEnd = this.segments.pop();
            this.game.clear(tailEnd.position);
            tail.push(tailEnd);
        }
        return tail;
    }

    private reverseDirection() {
        switch (+this.direction) {
            case Direction.top:
                return Direction.bottom;
            case Direction.bottom:
                return Direction.top;
            case Direction.left:
                return Direction.right;
            case Direction.right:
                return Direction.left;
            default:
                console.error(`Unknown direction "${this.direction}" -> ${+this.direction}`);
                // throw new Error('Unknown direction: ' + this.direction);
                return Direction.bottom;
        }
    }
}

const scoreField = document.getElementById('score-field');

function displaySore(score: any): void {
    scoreField.innerText = score;
}

const food = [];
food.push(new Food('assets/images/029-apple.png', 1));
food.push(new Food('assets/images/024-grapes.png', 3));
food.push(new Food('assets/images/026-mushroom-1.png', 7));

const game = new Game({
    canvasId: 'game-surface',
    gridSize: new Vector2(25, 25),

    food: food,
    maxFoodCount: 10,
    foodSpawnChance: 0.1,

    diamond: new Diamond('assets/images/070-star.png', 10),
    maxDiamondsCount: 0,
    diamondSpawnChance: 0.025
});
const snake = new Snake(game, 15);
game.speed = 10;
game.play();
