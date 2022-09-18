import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
 
import { Button } from '@mui/material';
import { URL_REQUEST } from '../util/util';
import { GameState } from '../interfaces/GameLoop';
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

  const startGame = (state: number) => {
    const requestOptions = {
      method: 'GET',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(URL_REQUEST + "game?state=" + state, requestOptions)
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
        SHOW GAME ON:
      </h1>
      <Button
        onClick={() => startGame(0)}
        variant="contained"
      >
        startGame 
      </Button>

      <h1>
        SHOW RESPONSES:
      </h1>
      <Button
        onClick={() => startGame(1)}
        variant="contained"
      >
        startresponses
      </Button>
    </div>
  );
}
export default Config;