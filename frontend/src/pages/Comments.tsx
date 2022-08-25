import { useEffect, useState } from 'react';

import { URL_REQUEST } from '../util/util';
import { Search } from '@mui/icons-material';
import { AppBar, Button, Grid, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

function Comments() {
  const [gameStatus, setGameStatus] = useState(0);
  const [comments, setComments] = useState<string[]>([]);


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
          console.log("--------status", response, gameStatus);
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
    fetch(URL_REQUEST + "Bulling?msg/"+msg, requestOptions)
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

  return (
    <>
      <Grid
        container
        spacing={6}
        direction="column"
        alignItems="center"
        justifyContent="center"
        // style={{ minHeight: '80vh' }}
      >
        <Grid item xs={3}>
          <List>
            {
              comments.map((key, index) => <ListItem disablePadding
                key={key+index}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AccessibleForwardIcon />
                  </ListItemIcon>
                  <ListItemText primary={key} />
                </ListItemButton>
              </ListItem>
              )
            }
          </List>
        </Grid>
        <Grid item xs={3}>
          <Button 
          onClick={()=> {}}
          variant="contained" size='large' color="success"> Enviar respuesta </Button>
        </Grid>
      </Grid>



    </>
  );
}


export default Comments;