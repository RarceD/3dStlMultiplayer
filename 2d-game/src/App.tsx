import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GameLoop from './pages/GameLoop'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <canvas id="myCanvas" width="640" height="640"></canvas>
      <GameLoop />
    </div>
  )
}

export default App
