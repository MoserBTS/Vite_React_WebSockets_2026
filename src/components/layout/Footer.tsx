import {AppBar, Typography} from "@mui/material";

export const Footer = () => {
    return (
        <AppBar position={'static'}>
            <Typography variant="subtitle1" sx={{textAlign: "center"}}>
                    Footer component
            </Typography>
        </AppBar>
    )
};