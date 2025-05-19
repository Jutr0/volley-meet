import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AuthorizedLinks from "./AuthorizedLinks";
import UnauthorizedLinks from "./UnauthorizedLinks";
import {AuthContext} from "../../../contexts/AuthContext";
import {formatUserName} from "../../../utils/formatters/user";

const Navbar = () => {

    const {currentUser} = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Volley Meet
                </Typography>

                <Box>
                    {currentUser ? <AuthorizedLinks/> : <UnauthorizedLinks/>}
                </Box>
                {currentUser &&
                    <Typography variant="caption" component="div" sx={{ml: 2}}>
                        {formatUserName(currentUser)}
                    </Typography>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
