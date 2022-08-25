import * as React from 'react';
import { Questions } from '../../interfaces/GameLoop';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, Switch } from '@mui/material';
import { useState } from 'react';


export interface BtnProps {
    name: string,
    icon: any,
    callback: () => void
}

interface Props {
    btnProps: BtnProps[]
    question: Questions
}

const ButtonArray = (props: Props) => {

    // Parse all props
    const { btnProps, question } = props;
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
        console.log("send response");
        setSendResponse(true);
        // setColor("#E4D192");
    }

    return (
        <>
            <div style={{ backgroundColor: '#C8B6E2' }}>

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
                            Time: {question.Answer}
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
                                        {question.Text}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {arrayBtn(question.Responses)}
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

            </div>
        </>
    );
}
export default ButtonArray;