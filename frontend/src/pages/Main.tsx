import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Connector from '../signalRConnection';
import AnimatedPerson from '../3dLoader/AnimatedPerson';
import ButtonArray, { BtnProps } from '../components/GUI/ButtonArray';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Stack from '@mui/material/Stack';
import AccessibleForward from '@mui/icons-material/AccessibleForward';
import { GameLoop, GameState, Questions } from '../interfaces/GameLoop';
import { useNavigate } from 'react-router-dom';
import { URL_REQUEST } from '../util/util';
import { Games } from '@mui/icons-material';

function Main() {
  const [message, setMessage] = useState("initial value");
  const [gameStatus, setGameStatus] = useState(0);
  /*
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
  */
  const GetGameStatus = () => {
    const requestOptions = {
      method: 'GET',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(URL_REQUEST + "game/status", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
         if (+response != gameStatus) {
          console.log("--------status", response, gameStatus);
          setGameStatus(+response);
         }
      });
  }
  useEffect(() => {
    const interval = setInterval(() => GetGameStatus(), 1000);
    return () => clearInterval(interval);
  }, [])

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
  const navigate = useNavigate();
  if (gameStatus !== Number(GameState.OnGame)) {
    // navigate("/login")
    console.log("change gameStatus", gameStatus, Number(GameState.OnGame));
    //setGameStatus(GameState.OnGame)
  }
  console.log("yes", gameStatus);

  const questions: Questions = 
    {
      Id: 1,
      Answer: 2,
      Responses: [
        "Padel? yo solo quiero practicar un deporte de rica",
        "Es más mala que Tomás Bretón en una barbacoa con la familia",
        "Hay veces que juega bien contra los Martínez",
        "María la facha se averguenza de ella"
      ],
      Text:  "¿Cómo de buena es Ángela jugando al padel?"
    };
      // <span>message from signalR: <span style={{ color: "green" }}>{message}</span> </span>
      // <AnimatedPerson />
  return (
    <> 
      {/* <button onClick={() => newMessage((new Date()).toISOString())}>send date </button> */}
      <ButtonArray btnProps={buttonArray} question={questions}/>
    </>
  );
}
// <iframe src="https://giphy.com/embed/pchI2y7P3SVGm04nen" width="480" height="480" frameBorder="0" allowFullScreen></iframe>
/*
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
*/

export default Main;