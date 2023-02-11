import React, { createRef, useEffect, Ref } from "react";
import { Sim } from "../logic/sim";

export type CanvasProps = {
    sim: Sim,
}

function SimulationCanvas(props: CanvasProps) {
    const sim: Sim = props.sim;
    const canvasRef: Ref<HTMLCanvasElement> = createRef();

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef?.current!;
        sim.init(canvas);
    }, []);
    const draw = (e: any) =>{
        sim.onMouseDown(e.clientX,e.clientY);
    }

    return (
        <canvas onMouseDown={draw} className="canvas" ref={canvasRef}ç
          width="360" height="800" />
    )
}

export default SimulationCanvas
