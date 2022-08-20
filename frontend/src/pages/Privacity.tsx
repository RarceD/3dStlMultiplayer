import React, { useEffect, useState } from 'react';
import logo from '../images/privacity.png';
import '../App.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Privacity = () => {
    const navigate = useNavigate();
    const returnMain = () => {
        navigate('/login');
    }
    return (
        <>
            <img src={logo} height={400} width={400}></img>
            Privacidad mis huevos
            <Button
                variant="contained"
                onClick={() => returnMain()}>
                Volver al puto juego
            </Button>
        </>
    );
}
export default Privacity;