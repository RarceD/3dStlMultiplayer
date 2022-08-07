import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Connector from './signalRConnection';
import AnimatedPerson from './3dLoader/AnimatedPerson';
import ButtonArray from './components/GUI/ButtonArray';

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
  return (
    <div className="App">
      <h1> raad rules</h1>
      <AnimatedPerson />
      <ButtonArray />
    </div>
  );
}

export default App;

