import { createRealtimeUpdate } from "./realtime";
import { Player } from "../interfaces/Player";
import { RandomIntFromInterval, RandomRainbowColor } from "../util/util";

export interface Sim {
    init: (canvasElement: HTMLCanvasElement) => void,
    start: (count: number) => void,
    clear: () => void,
    move: () => void,
    onMouseDown: (x: number, y: number) => void
}

export const CreateGameLoop = () => {
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let players: Player[] = [];

    const init = (canvasElement: HTMLCanvasElement): void => {
        if (canvas !== null) {
            console.error('Cannot re-initialise the simulation');
            return;
        }
        canvas = canvasElement;
        ctx = canvas.getContext("2d")!;
        createRealtimeUpdate(120, window, tick);
    }
    const tick = (dt: number, fps: number): void => {
        if (canvas === null || ctx === null) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderDevider();
        renderBalls();
    }
    const renderDevider = (): void => {
        if (canvas === null || ctx === null) return;
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.rect(0,  canvas.height / 2, canvas.width, 10);
        ctx.fill();
        ctx.stroke();
    }
    const renderBalls = (): void => {
        if (ctx === null) return;
        for (let p of players) {
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.lineWidth = 1;
            ctx.arc(p.position.x, p.position.y, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
    }

    const start = (count: number): void => {
        if (canvas === null) {
            console.error('Simulation has not been initialised');
            return;
        }
        for (let i = 0; i < count; ++i) {
            let p: Player = {
                position: {
                    x: RandomIntFromInterval(0, 500),
                    y: RandomIntFromInterval(0, 500)
                },
                color: "#ffa500"
            };
            players.push(p);
        }
    }
    const clear = () => {
    }
    const onMouseDown = (x: number, y: number) => {
        let p: Player = {
            position: {
                x: x - 30,
                y: y - 30 
            },
            color: RandomRainbowColor()

        };
        players.push(p);
    }

    const move = () => {
        for (let p of players) {
            p.position.x += RandomIntFromInterval(-10, 10);
            p.position.y += RandomIntFromInterval(-10, 10);
        }
    }
    return { init, start, clear, move, onMouseDown } as Sim;
}