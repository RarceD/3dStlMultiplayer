import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import { deepOrange } from '@mui/material/colors';
import { URL_REQUEST } from '../util/util';
import { BoyRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import image_logo from './../images/logo.png';

export const Login = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [errorSubmit, setErrorSubmit] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        let data = { Name: user, Position: pass }
        if (user === "" || pass === "") return;
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

        fetch(URL_REQUEST + "credentials", requestOptions)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log(response);
                localStorage.setItem("id", response.id);
                localStorage.setItem("name", user);
                localStorage.setItem("position", pass);
                localStorage.setItem("question", "0");
                navigate('/3d');
            });
    }

    return (
        <>
            {/* <ThemeProvider theme={theme}> */}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    component="form"
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 2, bgcolor: deepOrange[600], width: 104, height: 104 }}
                        variant="rounded"
                        src={image_logo}>
                        {/* <SportsBaseballIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ChochoPowerGame
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
                        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
                        <TextField
                            margin="normal"
                            fullWidth
                            error={errorSubmit}
                            label="Usuario"
                            name="email"
                            autoFocus
                            onChange={(e: any) => { setUser(e.target.value); }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            error={errorSubmit}
                            name="password"
                            label="Postura sexual favorita"
                            onChange={(e: any) => { setPass(e.target.value); }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Me gustan los trenes"
                        />
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Acceder
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2"> */}
                                <Link variant="body2" href="privacity">
                                    Aceptar politica de privacidad
                                </Link>
                            </Grid>
{/*                             <Grid item>
                                <Link variant="body2" href="comments">
                                    Añadir comentarios
                                </Link>
                            </Grid> */}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
export default Login;