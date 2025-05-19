import {Button} from "../../ui/button";
import {NavLink} from "react-router-dom";
import React from "react";

const UnauthorizedLinks = () => {

    return <>
        <Button
            variant="ghost"
            asChild
        >
            <NavLink to="/login"> Login</NavLink>
        </Button>
        <Button

            variant="ghost"
            asChild
        >
            <NavLink to="/register"> Register</NavLink>
        </Button>
    </>
}


export default UnauthorizedLinks;