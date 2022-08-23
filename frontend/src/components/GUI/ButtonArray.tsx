import * as React from 'react';
import { Questions } from '../../interfaces/GameLoop';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, Switch } from '@mui/material';


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

    const arrayBtn = (b: string[]) => {
        return b.map((key, index) => <CardActionArea
            key={key}
        >
            <Switch defaultChecked  />
            {key}
        </CardActionArea>
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
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    Time: {question.Answer} 
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345, backgroundColor: "#34cceb3f" }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="340"
                                image="/images/icon0.png"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {question.Text}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        {arrayBtn(question.Responses)}
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" size='large' color="success"> Enviar respuesta </Button>
                </Grid>
            </Grid>

        </>
    );
}
export default ButtonArray;