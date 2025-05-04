import Button from "../../common/Button";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../../../contexts/AuthContext";

const AuthorizedLinks = () => {

    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    return <>
        <Button
            color="inherit"
            component={NavLink}
            to="/"
        >
            Home
        </Button>
        <Button
            color="inherit"
            onClick={handleLogout}
        >
            Logout
        </Button>
    </>
}


export default AuthorizedLinks;