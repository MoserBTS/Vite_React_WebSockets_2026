
import * as React from 'react';
import {AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import {useNavigate} from "react-router-dom";
import {bindMenu, bindTrigger} from "material-ui-popup-state/hooks";
import PopupState from "material-ui-popup-state";

export const Header = () => {
    const navigate = useNavigate();
    const goTo = (path: string, closeMenu: () => void) => () => {
        closeMenu();
        navigate(path);
    };
    return (
        <AppBar position={'static'}>
            <Toolbar>
                <IconButton size={'large'} edge={'start'} color={'inherit'} aria-label={'logo'} onClick={() => navigate("/")}>
                    <CloseFullscreenIcon/>
                </IconButton>
                <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
                    REACT STUCTURE DE BASE
                </Typography>
                <Button variant="contained" onClick={() => navigate("/")}>Home</Button>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)}>
                                Dashboard
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={goTo('/profil', popupState.close)}>Mon profil</MenuItem>
                                <MenuItem onClick={goTo('/compte', popupState.close)}>Mon compte</MenuItem>
                                <MenuItem onClick={goTo('/logout', popupState.close)}>Logout</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </Toolbar>
        </AppBar>
    );
}