import { createRealtimeUpdate } from "./realtime";
import { Player } from "../interfaces/Player";


export interface Sim {
    init: (canvasElement: HTMLCanvasElement) => void,
    hasInit: () => boolean,
    spawn: (count: number) => void,
    clear: () => void,
    setPerformanceMode: (on: boolean) => void,
    setShowFPS: (on: boolean) => void,
}

export const createSim = () => {

    const CELL_SIZE = 16;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let showGrid: boolean = true;
    let showFPS: boolean = true;
    let enablePerformanceMode: boolean = true;
    let players: Player[] = [{
        position: {
            x: 10,
            y: 10
        }
    }];
    //let grid: Cell[][];

    const init = (canvasElement: HTMLCanvasElement): void => {

        if (canvas !== null) {
            console.error('Cannot re-initialise the simulation');
            return;
        }
        canvas = canvasElement;
        ctx = canvas.getContext("2d")!;

        //grid = generateGridFromCanvas(canvas, CELL_SIZE, '#ffe282');

        createRealtimeUpdate(120, window, tick);

    }
    const tick = (dt: number, fps: number): void => {
        if (canvas === null || ctx === null) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderBalls();
    }
    const renderBalls = (): void => {
        if (ctx === null) return;
        for (let p of players) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(p.position.x, p.position.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

    }

    const hasInit = (): boolean => {
        return canvas !== null;
    }

    const spawn = (count: number): void => {

        if (canvas === null) {
            console.error('Simulation has not been initialised');
            return;
        }

        for (let i = 0; i < count; i++) {
            //const boid: Boid = createRandomlyOnACanvas(canvas, 4, 8, '#FFFFFFFF', 32);
            //randomizeVelocityDirection(boid);
            //boids.push(boid);
        }

    }
    const clear = () => {
        for (let p of players) {
            p.position.x += 20;
        }
    }
    const setShowFPS = () => {
    }
    const setPerformanceMode = () => {
    }
    const setShowGrid = () => {
    }
    return {
        init,
        hasInit,
        spawn,
        clear,
        setShowGrid,
        setPerformanceMode,
        setShowFPS
    } as Sim;
}