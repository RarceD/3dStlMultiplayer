import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Player } from '../interfaces/Players';
import { URL_REQUEST } from '../util/util';
import { GameState } from '../interfaces/GameLoop';
import { useNavigate } from 'react-router-dom';

const Waiting = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStatus, setGameStatus] = useState<number>(0);

  const CheckUsers = () => {
    const requestOptions = {
      method: 'GET',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(URL_REQUEST + "credentials", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        // console.log(response);
        let playersNew: Player[] = response;
        if (playersNew.length !== players.length) {
          console.log("update players", playersNew)
          setPlayers(response);
        }
      });
  }
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
        // console.log("status", response);
        if (response !== gameStatus) {
          console.log("status change")
          setGameStatus(response);
        }

      });
  }
  useEffect(() => {
    const intervalUser = setInterval(() => CheckUsers(), 2000);
    const intervalStatus = setInterval(() => GetGameStatus(), 1000);
    return () => {
      clearInterval(intervalUser);
      clearInterval(intervalStatus);
    }
  }, [])

  const ShowPlayersWaiting = (players: Player[]) => {
    return (
      players.map((p, index) =>
        <>
          <ListItem alignItems="flex-start"
            key={p.name + index}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={"/images/icon" + index + ".png"} />
            </ListItemAvatar>
            <ListItemText
              primary={p.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {p.position}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      )
    );
  }
  const navigate = useNavigate();
  if (gameStatus === Number(GameState.OnGame)) {
    navigate("/main")
  }

  return (
    <>
      <Typography alignContent={"center"}> El ChochoPowerGame empezará en unos minutos</Typography>
      <iframe src="http://giphy.com/embed/LiWsL77P4tA9a" width="400" height="300" frameBorder="0" allowFullScreen></iframe>
      <div className="App">
        Lista de gente:
      </div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {ShowPlayersWaiting(players)}
      </List>
    </>
  );
}
export default Waiting;