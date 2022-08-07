import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Stack from '@mui/material/Stack';


const ButtonArray = () => {
    const arrayBtn = () => {
        const b: string[] = ["asd", "·asd", "asdf"];
        return b.map((key) => <Button variant="outlined" startIcon={<DeleteIcon />}> Delete</Button>);
    }

    return (
        // <Stack direction="column" spacing={2}>
        // </Stack>
        <>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Button variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
            <Button variant="contained" endIcon={<AccessibleForwardIcon />}>
                Send
            </Button>
            {arrayBtn}
        </>
    );
}
export default ButtonArray;