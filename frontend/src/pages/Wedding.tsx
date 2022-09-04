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
import { CommentsDto } from '../interfaces/Wedding';
import { useNavigate } from 'react-router-dom';
import { randomBytes } from 'crypto';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Fab, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Wedding = () => {
  const [weddingMsg, setWeddingMsg] = useState<CommentsDto[]>([]);
  const [gameStatus, setGameStatus] = useState<number>(0);
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    navigate("/wedding/publish")
  }
  const handleClose = () => setOpen(false);


  const CheckUsers = () => {
    const requestOptions = {
      method: 'GET',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(URL_REQUEST + "wedding", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        let playersNew: CommentsDto[] = response;
        if (playersNew.length !== weddingMsg.length) {
          // console.log("update players", playersNew)
          setWeddingMsg(playersNew);
        }
      });
  }

  const handleSubmit = () => {
  }
  useEffect(() => {
    CheckUsers();
    const intervalUser = setInterval(() => CheckUsers(), 20000);
    return () => {
      clearInterval(intervalUser);
    }
  }, [])

  const ShowPlayers = (players: CommentsDto[]) => {

    return (
      players.map((p, index) =>
        <>
          <ListItem alignItems="flex-start"
            key={p.msg + index}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={"/images/nicon" + Math.floor(Math.random() * 10).toString() + ".png"} />
            </ListItemAvatar>
            <ListItemText
              primary={p.msg}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
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
  if (gameStatus === Number(GameState.OnGame)) {
    navigate("/main")
  }

  return (
    <>

      <Grid
        container
        spacing={6}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid item xs={12} >
          <img src={"images/book2.png"} height={60} style={{marginTop:'40px'}}/>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="h4" component="h2" align='center'>
            Libro de visitas
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img src={"images/book.png"} height={60} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="h6" align='center'>
            Bienvenido al libro de visitas, si quieres dejar un mensaje pulsa el botón, en caso contrario haz scroll hacia abajo y lee los comentarios de otras personas. Los mensajes son anónimos pero siempre puedes añadir tu nombre.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            onClick={handleOpen}
            sx={{ mt: 3, mb: 2 }}
          >
            Publicar mensaje
          </Button>

        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="h6" align='justify'>
            Muchas gracias
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1" align='center'>
          </Typography>
        </Grid>
      </Grid>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {ShowPlayers(weddingMsg)}
      </List>

    </>
  );
}
export default Wedding;