import * as React from 'react';
import Button from '@mui/material/Button';


export interface BtnProps {
    name: string,
    icon: any,
    callback: () => void
}

interface Props {
    btnProps: BtnProps[]
}

const ButtonArray = (props: Props) => {

    // Parse all props
    const { btnProps } = props;

    const arrayBtn = (b: BtnProps[]) => {
        return b.map((key, index) => <Button
            key={key.name}
            variant="contained"
            startIcon={key.icon}
            onClick={key.callback}
        > {key.name} </Button>
        );
    }

    return (
        <>
            {arrayBtn(btnProps)}
        </>
    );
}
export default ButtonArray;