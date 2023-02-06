
import { useEffect, useState } from 'react'
import { Player } from '../interfaces/Player';

function GameLoop() {
    const [count, setCount] = useState(0)
    const [players, setPlayers] = useState<Player[]>([ {
        position: {
            x: 50,
            y: 50
        }
    }])
    let ctx: any = null;
    let canvas: any = null;
    let x: any = 0;
    let y: any = 0;
    let dx: any = 0;
    let dy: any = 0;

    setTimeout(init, 50);
    function init() {
        console.log("init");
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        x = canvas.width / 2;
        y = canvas.height / 2;
        dx = 2;
        dy = -2;
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawMyPlayer() {
        ctx.beginPath();
        ctx.arc(players[0].position.x, players[0].position.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function refresh() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawMyPlayer();
        x += -2;
        y += -2;
    }

    setInterval(refresh, 100);

    const HandleUpBtn = () => {
        players[0].position.x += 20;

    }
    console.log("render");
    return (
        <div>
        <button onClick={HandleUpBtn}>UP</button>
        <button>DOWN</button>
        <button>LEFT</button>
        <button>RIGHT</button>
        </div>
    )
}

export default GameLoop;