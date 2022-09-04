import { useState } from 'react';

import Typography from '@mui/material/Typography';
import { URL_REQUEST } from '../util/util';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';

const CommentsPublish = () => {
  const [msg, setMsg] = useState<string>("");
  const [responseBack, setResponseBack] = useState<string>("");
  const navigate = useNavigate();

  const handleOpen = () => {
    const data = { msg: msg };
    const requestOptions = {
      method: 'POST',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)

    };
    fetch(URL_REQUEST + "bulling", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        let s: string = " ";
        setMsg(s);
        console.log(response)
        switch (response) {
          case "ok":
            setResponseBack("Publicación correcta");
            break
          default:
            setResponseBack("HAS GANADO GOMINOLA:" + response)
            break;
        }
        //navigate("/comments")
      });
  }
  const handleClose = () => {
    navigate("/comments");
  }

  return (
    <>

      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', minWidth: '100%' }}
      >
        <Grid item xs={12} >
          <Typography component="h1" variant="h5">
            Añadir mensaje:
          </Typography>
        </Grid>
        <Grid item xs={12} >
          <TextField
            margin="normal"
            fullWidth
            label="Deja un buen insulto:"
            name={msg}
            multiline
            rows={12}
            
            onChange={(e: any) => { setMsg(e.target.value); }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size='large'
            variant="contained"
            onClick={handleOpen}
          >
            Publicar mensaje
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            size='large'
            variant="outlined"
            onClick={handleClose}
          >
            salir
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" color="#ff0000">
            {responseBack}
          </Typography>
        </Grid>
      </Grid>



    </>
  );
}
export default CommentsPublish;
