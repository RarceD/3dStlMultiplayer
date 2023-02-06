import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GameLoop from './pages/GameLoop'
import React from 'react';
import SimulationCanvas from './components/SimulationCanvas';
import { createSim, Sim } from './logic/sim';

const PersistentCanvas = React.memo(SimulationCanvas);

function App() {
  const sim = useRef<Sim>(createSim());

  const HandleUpBtn = () => {
    sim.current.clear();
  }

  return (
    <div className="App">
      <PersistentCanvas sim={sim.current} />
      <button onClick={HandleUpBtn}>UP</button>
    </div>
  )
}

//<canvas id="myCanvas" width="640" height="640"></canvas>
//<GameLoop />

export default App
