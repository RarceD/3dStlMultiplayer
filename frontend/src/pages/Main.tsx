import { useEffect, useState } from 'react';

import { GameLoop, GameState } from '../interfaces/GameLoop';
import { useNavigate } from 'react-router-dom';
import { URL_REQUEST } from '../util/util';
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Switch, Typography } from '@mui/material';
import { PlayerResponses, Responses } from '../interfaces/Responses';
import Results from './Results';

interface Props {
  gameData: GameLoop,
  playerResponses: Responses
}

function Main(props: Props) {
  const [gameStatus, setGameStatus] = useState(0);

  const GetGameStatus = () => {
    let d = { data: "asd" };
    const requestOptions = {
      method: 'POST',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      //body: JSON.stringify(d).toString;
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
    //const interval = setInterval(() => GetGameStatus(), 1000);
    //return () => clearInterval(interval);
  }, [])

  const navigate = useNavigate();
  if (gameStatus !== Number(GameState.OnGame)) {
    // navigate("/login")
    console.log("change gameStatus", gameStatus, Number(GameState.OnGame));
    //setGameStatus(GameState.OnGame)
  }

  const [sendResponse, setSendResponse] = useState(false);
  const [color, setColor] = useState("#DFF6FF");

  const arrayBtn = (b: string[]) => {
    return b.map((key, index) => <CardActionArea
      key={key}
    >
      <Typography align={"left"} >
        <Switch disabled={sendResponse} />
        {key}
      </Typography>
    </CardActionArea>
    );
  }
  const sendResponseFunc = () => {
    setSendResponse(true);
  }
  if (props.gameData.state === 1)
    return (
      <>
          <Grid
            container
            spacing={6}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid item xs={3}>
              <Typography gutterBottom variant="h5" component="div" align={"center"}>
                Time: {props.gameData.time}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345, backgroundColor: color, border: 1, borderRadius: '9px' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/images/icon0.png"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" align={"center"}>
                      {props.gameData.text}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {arrayBtn(props.gameData.responses)}
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained" size='large'
                color="success"
                onClick={sendResponseFunc}
              > Enviar respuesta </Button>
            </Grid>
          </Grid>
      </>
    );
  else
    return <Results playerResponses={props.playerResponses} />
}

export default Main;