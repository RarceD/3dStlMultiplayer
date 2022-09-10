import { useEffect, useState } from 'react';
import Connector from './signalRConnection';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoPulse from './pages/NoPulse';
import Privacity from './pages/Privacity';
import Waiting from './pages/Waiting';
import Config from './pages/Config';
import ThreeD from './pages/ThreeD';
import Wedding from './pages/Wedding';
import WeddingPublish from './pages/WeddingPublish';
import Login from './pages/Login';
import { CubeProps } from './interfaces/Cubes';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import Comments from './pages/Comments';
import CommentsPublish from './pages/CommentsPublish';
import { GameLoop, GameState, initState } from './interfaces/GameLoop';
import { initResponses, Responses } from './interfaces/Responses';

function App() {
  const [message, setMessage] = useState("initial value");
  const [gameStatus, setGameStatus] = useState<GameLoop>(initState());
  const [playerResponses, setPlayerReponses] = useState<Responses>(initResponses());
  const [spots, setSpots] = useState<CubeProps[]>([]);

  const { newMessage, events } = new Connector();
  useEffect(() => {

    // Get info from game status:
    const func1 = (a: any, b: any) => {
      console.log("func1", a, b);
    }
    const onLocationReceived = (a: any) => {
      console.log("onLocationReceived", a);
      let pos: string = a;
      let posValues: string[] = pos.split(";");
      let newCube: CubeProps = {
        x: Number(posValues[0].substring(0, 8).replace(",", ".")),
        y: Number(posValues[1].substring(0, 8).replace(",", ".")),
        z: Number(posValues[2].substring(0, 8).replace(",", ".")),
      }
      let copyCubes = spots;
      copyCubes.push(newCube)
      setSpots(copyCubes);
    }
    const onGameStatusReceived = (a: GameLoop) => {
      let newGame: GameLoop = initState();
      newGame.id = a.id;
      newGame.responses = a.responses;
      newGame.state = a.state;
      newGame.text = a.text;
      newGame.time = a.time;
      setGameStatus(newGame);
      console.log("gameState:", newGame);
    }

    const onResponsesReceived = (a: Responses) => {
      let newResponses: Responses = initResponses();
      newResponses.correctResponse = a.correctResponse;
      newResponses.playersResults = a.playersResults;
      setPlayerReponses(newResponses);
      console.log("playerResponses:", newResponses);
    }
    events(func1, onLocationReceived, onGameStatusReceived, onResponsesReceived);

  });

  let modifyStuff = () => {
  }

  useEffect(()=>{
    //setInterval(function(){ modifyStuff() }, 2000);
  }, [modifyStuff])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main gameData={gameStatus} playerResponses={playerResponses}/>} />
        <Route path="/noPulse" element={<NoPulse />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/comments/publish" element={<CommentsPublish />} />
        <Route path="/privacity" element={<Privacity />} />
        <Route path="/waiting" element={<Waiting gameData={gameStatus}  />} />
        <Route path="/config" element={<Config />} />
        <Route path="/*" element={<Login />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/wedding/publish" element={<WeddingPublish />} />
        <Route path="/3d" element={
          <ThreeD
            sendWsMsg={(msg: string) => {
              console.log("App.tsx", msg);
              newMessage(msg);
            }}
            spots={spots}
          />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
        //<Route path="*" element={<Login />} />