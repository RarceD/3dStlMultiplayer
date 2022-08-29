import { useState } from 'react';

import Typography from '@mui/material/Typography';
import { URL_REQUEST } from '../util/util';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button, Container, TextField } from '@mui/material';




const WeddingPublish = () => {
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  const handleOpen = () => {
    console.log(msg);
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

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          component="div"
        >
          <Typography component="h1" variant="h5">
            Añadir mensaje
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Deja un mensaje para la pareja:"
              name="Deja un mensaje para la pareja:"
              autoFocus
              onChange={(e: any) => { setMsg(e.target.value); }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleOpen}
              sx={{ mt: 3, mb: 2 }}
            >
              Publicar mensaje
            </Button>

          </Box>
        </Box>
      </Container>


    </>
  );
}
export default WeddingPublish;
