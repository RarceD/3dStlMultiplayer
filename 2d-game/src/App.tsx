import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './Game.css'
import GameLoop from './pages/GameLoop'
import React from 'react';
import SimulationCanvas from './components/SimulationCanvas';
import { CreateGameLoop, Sim } from './logic/sim';

const PersistentCanvas = React.memo(SimulationCanvas);

function App() {
  const sim = useRef<Sim>(CreateGameLoop());

  // When simulation start I Load population:
  useEffect(()=> {
    //sim.current.start(1);
  });

  const HandleUpBtn = () => {
    sim.current.move();
  }

  return (
    <div className="App">
      <div className="title"> Frase de Abuela o Frase de Ángela</div> <PersistentCanvas sim={sim.current} />
      <button onClick={HandleUpBtn}>UP</button>
    </div>
  )
}
export default App
