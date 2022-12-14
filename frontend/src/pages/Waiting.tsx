import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Player } from '../interfaces/Players';
import { URL_REQUEST } from '../util/util';
import { GameLoop } from '../interfaces/GameLoop';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

interface Props {
  gameData: GameLoop
}
const Waiting = (props: Props) => {
  const [players, setPlayers] = useState<Player[]>([]);

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
  useEffect(() => {
    const intervalUser = setInterval(() => CheckUsers(), 4000);
    return () => {
      clearInterval(intervalUser);
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
  if (1 === Number(props.gameData.state)) {
    console.log("waiting page: ", props.gameData.state)
    navigate("/main")
  }

  return (
    <>

      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Typography gutterBottom variant="h6" component="div" align={"center"}>
            El ChochoPowerGame empezar?? en unos minutos
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <iframe src="http://giphy.com/embed/LiWsL77P4tA9a" title="waitingProps" width="400" height="300" frameBorder="0" allowFullScreen></iframe>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h6" align={"center"}>
            Lista de gente:
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {ShowPlayersWaiting(players)}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
export default Waiting;