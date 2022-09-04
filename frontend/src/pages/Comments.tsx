import { useEffect, useState } from 'react';

import { URL_REQUEST } from '../util/util';
import { Avatar, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CommentsDto } from '../interfaces/Wedding';

function Comments() {
  const [gameStatus, setGameStatus] = useState(0);
  const [comments, setComments] = useState<CommentsDto[]>([]);
  const navigate = useNavigate();



  const GetGameStatus = () => {
    const requestOptions = {
      method: 'GET',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(URL_REQUEST + "bulling", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        //console.log("--------status", response, gameStatus);
        setComments(response)
      });
  }

  const AddMsg = (msg: string) => {
    const requestOptions = {
      method: 'GET',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(URL_REQUEST + "Bulling?msg/" + msg, requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log("response", response);
        GetGameStatus();
      });
  }
  useEffect(() => {
    GetGameStatus();
    const interval = setInterval(() => GetGameStatus(), 10000);
    return () => clearInterval(interval);
  }, [])

  const ShowPlayers = (players: CommentsDto[]) => {

    return (
      players.map((p, index) =>
        <>
          <ListItem alignItems="flex-start"
            key={p.msg + index}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={"/images/icon" + Math.floor(Math.random() * 13).toString() + ".png"} />
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
          <img src={"images/book2.png"} height={60} style={{ marginTop: '40px' }} />
        </Grid>
        <Grid item xs={12} >
          <Typography variant="h4" component="h2" align='center'>
            Insultario
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img src={"images/book.png"} height={60} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="h6" align='center'>
            Bienvenido, si quieres dejar un mensaje pulsa el botón, en caso contrario haz scroll hacia abajo y lee los comentarios de otras personas. Los mensajes son anónimos pero siempre puedes añadir tu nombre.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            onClick={() => {
              navigate("/comments/publish")
            }}
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
        {ShowPlayers(comments)}
      </List>

    </>
  );
}


export default Comments;