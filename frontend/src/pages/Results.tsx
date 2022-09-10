import React, {  } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Responses } from '../interfaces/Responses';
import { Grid } from '@mui/material';

interface Props {
  playerResponses: Responses
}
const Results = (props: Props) => {

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
          <Typography gutterBottom variant="h5" component="div" align={"center"}>
            La respuesta correcta es:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <iframe src="http://giphy.com/embed/aWRWTF27ilPzy" title="resUnique" width="280" height="159" frameBorder="0" ></iframe>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h6" align={"center"}>
            {props.playerResponses.correctResponse}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {props.playerResponses.playersResults.map((p, index) =>
              <>
                <ListItem alignItems="flex-start"
                  key={p.playerName + index}
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={p.success ? "/images/win.png" : "/images/lost.png"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary= {p.playerName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          asd
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </>
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
export default Results;