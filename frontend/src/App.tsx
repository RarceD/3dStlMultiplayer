import { useEffect, useState } from 'react';
import Connector from './signalRConnection';

import { GameLoop } from './interfaces/GameLoop';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './pages/Login';
import NoPulse from './pages/NoPulse';
import Privacity from './pages/Privacity';
import Waiting from './pages/Waiting';
import Config from './pages/Config';
import Comments from './pages/Comments';
import ThreeD from './pages/ThreeD';
function App() {
  const [message, setMessage] = useState("initial value");
  /*
  const { newMessage, events } = new Connector();
  useEffect(() => {
    // events((a: any, message: any) => setMessage(message));
    const handleMessageReceived = (a: any, message: any) => {
      // console.log("received", a, message);
      // let test: GameLoop = JSON.parse(message);
      // console.log(test)
      setMessage(message);
    }
    const handleSomeOtherServerEventReceived = (payload: any) => { console.log(payload); }
    events(handleMessageReceived, handleSomeOtherServerEventReceived);


    setTimeout(() => {
      console.log("send data");
      newMessage((new Date()).toISOString());
    }, 1000)
  });
  */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/noPulse" element={<NoPulse />} />
        <Route path="/privacity" element={<Privacity />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/config" element={<Config />} />
        <Route path="/3d" element={<ThreeD />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
        //<Route path="*" element={<Login />} />