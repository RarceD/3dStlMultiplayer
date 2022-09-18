import { useEffect, useState } from 'react';

import { GameLoop, GameState } from '../interfaces/GameLoop';
import { useNavigate } from 'react-router-dom';
import { URL_REQUEST } from '../util/util';
import { Button, Card, CardActionArea, CardContent, CardMedia, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import { initResponses, PlayerResponses, Responses } from '../interfaces/Responses';
import Results from './Results';


const SendResponseServer = (questionId: number, response: number) => {
  let userId: any | null = localStorage.getItem("id");
  let data =
  {
    id: Number(userId),
    questionId: questionId,
    response: response
  }
  const to_send = JSON.stringify(data)
  const requestOptions = {
    method: 'POST',
    mode: "cors" as RequestMode,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: to_send
  };
  fetch(URL_REQUEST + "game", requestOptions)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log("response send resp:", response);
    });
}

interface Props {
  gameData: GameLoop,
  playerResponses: Responses
}

function Main(props: Props) {
  const [gameStatus, setGameStatus] = useState(0);
  const [sendResponse, setSendResponse] = useState(false);
  const [allResponses, setAllResponses] = useState<Responses[]>([]);
  const [color, setColor] = useState("#DFF6FF");

  const [valueSelector, setValueSelector] = useState("1");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSelector((event.target as HTMLInputElement).value);
  };

  if (Number(props.gameData.time) === 0) {
    // console.log("time is 0, send the response", props.gameData.time);
    SendResponseServer(props.gameData.id, Number(valueSelector));
  }
  //console.log(props.gameData.state, "state");
  //console.log(props.playerResponses, "responses");


  const getAllResponses = () => {
    const requestOptions = {
      method: 'GET',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(URL_REQUEST + "game/responses", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log("GET", response);
        let r: Responses[] = response;
        setAllResponses(r)
      });
  }

  useEffect(() => {
    getAllResponses();
    //setAllResponses(responses);
  }, []);


  if (props.gameData.state === GameState.OnGame)
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

              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueSelector}
                  onChange={handleChange}
                >
                  {
                    props.gameData.responses.map((key, index) => <FormControlLabel
                      key={key}
                      value={index}
                      control={<Radio />}
                      label={key} />)
                  }
                </RadioGroup>
              </FormControl>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  // else if (props.gameData.state === GameState.Results)
  // return <Results playerResponses={props.playerResponses} />
  else
    //return <h1> Status not handle </h1>
    return <Results playerResponses={allResponses} />

}

export default Main;