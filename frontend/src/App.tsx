import { useEffect, useState } from 'react';
import './App.css';
import Connector from './signalRConnection';

import { GameLoop } from './interfaces/GameLoop';
import Main from './pages/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NoPulse from './pages/NoPulse';
import Privacity from './pages/Privacity';
import Waiting from './pages/Waiting';

function App() {
  const [message, setMessage] = useState("initial value");
  const { newMessage, events } = new Connector();
  useEffect(() => {
    // events((a: any, message: any) => setMessage(message));
    const handleMessageReceived = (a: any, message: any) => {
      // console.log("received", a, message);
      let test: GameLoop = JSON.parse(message);
      console.log(test)
      setMessage(message);
    }
    const handleSomeOtherServerEventReceived = (payload: any) => { console.log(payload); }
    events(handleMessageReceived, handleSomeOtherServerEventReceived);

    setTimeout(() => {
      console.log("asd");
      newMessage((new Date()).toISOString());
    }, 10000)
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/noPulse" element={<NoPulse />} />
        <Route path="/privacity" element={<Privacity />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;