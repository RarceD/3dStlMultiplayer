import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";
import { CommentsDto } from "../../interfaces/Wedding";

const ShowPlayers = (players: CommentsDto[]) => {

    return (
        players.map((p, index) =>
            <>
                <ListItem alignItems="flex-start"
                    key={p.msg + index}
                >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={"/images/nicon" + Math.floor(Math.random() * 10).toString() + ".png"} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={p.msg}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </>
        )
    );
}
export default ShowPlayers;