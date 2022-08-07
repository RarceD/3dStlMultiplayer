import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Connector from './signalRConnection';
import AnimatedPerson from './3dLoader/AnimatedPerson';
import ButtonArray, { BtnProps } from './components/GUI/ButtonArray';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Stack from '@mui/material/Stack';
import AccessibleForward from '@mui/icons-material/AccessibleForward';

// function App() {
//   const { newMessage, events } = new Connector();
//   const [message, setMessage] = useState("initial value");
//   useEffect(() => {
//     // events((a: any, message: any) => setMessage(message));
//     const handleMessageReceived = (a: any, message: any) => {
//       console.log("received", a, message);
//       setMessage(message);
//     }
//     const handleSomeOtherServerEventReceived = (payload: any) => { console.log(payload); }
//     events(handleMessageReceived, handleSomeOtherServerEventReceived);
//   });
//   return (
//     <div className="App">
//       <span>message from signalR: <span style={{ color: "green" }}>{message}</span> </span>
//       <br />
//       <button onClick={() => newMessage((new Date()).toISOString())}>send date </button>
//     </div>
//   );
// }

function App() {
  useEffect(() => {
  });
  const [buttonArray, setButtonArray] = useState<BtnProps[]>([
    {
      name: "Delete",
      icon: <DeleteIcon />,
      callback: () => { console.log("delete") }
    },
    {
      name: "send",
      icon: <SendIcon />,
      callback: () => { console.log("send") }
    },
    {
      name: "Lol",
      icon: <AccessibleForward />,
      callback: () => { console.log("lol") }
    }

  ]);
  return (
    <div className="App">
      <h1> 3D STL PLAYER </h1>
      <AnimatedPerson />
      <ButtonArray btnProps={buttonArray} />
    </div>
  );
}

export default App;

