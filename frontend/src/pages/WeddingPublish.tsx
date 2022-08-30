import { useState } from 'react';

import Typography from '@mui/material/Typography';
import { URL_REQUEST } from '../util/util';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button, Container, Grid, TextField } from '@mui/material';




const WeddingPublish = () => {
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  const handleOpen = () => {
    try {
        
    } catch (e: any) {

    }
    if (msg.length < 10) return;


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
    fetch(URL_REQUEST + "wedding", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log(response)
        if (response == "ok") {
          console.log("status change")
          navigate("/wedding")
        }
      });
  }
  const handleClose = () => {
    navigate("/wedding");
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
            label="Deja un mensaje para la pareja:"
            name="Deja un mensaje para la pareja:"
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
      </Grid>



    </>
  );
}
export default WeddingPublish;
