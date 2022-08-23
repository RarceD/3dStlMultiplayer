import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
 
import { Button } from '@mui/material';
import { URL_REQUEST } from '../util/util';
const Config = () => {
  const clearPlayers = () => {
    const requestOptions = {
      method: 'GET',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(URL_REQUEST + "credentials/?clear=1", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log(response);
      });
  }

  const startGame = () => {
    const requestOptions = {
      method: 'GET',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(URL_REQUEST + "game", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log(response);
      });
  }
  return (
    <div className="App">
      <h1>
        Config page:
      </h1>
      <Button
        onClick={clearPlayers}
        variant="contained"
      >
        clearPlayer ()
      </Button>
      <h1>
        Logs:
      </h1>
      <Button
        onClick={startGame}
        variant="contained"
      >
        startGame ()
      </Button>
    </div>
  );
}
export default Config;