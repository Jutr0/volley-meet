import {Button} from "../../ui/button";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {ROLES} from "../../../utils/constants";

const links = [
    {path: '/superadmin/users', label: 'Users', roles: [ROLES.SUPERADMIN]},
    {path: '/superadmin/teams', label: 'Teams', roles: [ROLES.SUPERADMIN]},
    {path: '/my-team', label: 'My Team', roles: [ROLES.USER]},
    {path: '/invitations', label: 'Invitations', roles: [ROLES.USER]}
]

const AuthorizedLinks = () => {

    const {logout, currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    const currentUserLinks = links.filter(link => link.roles === 'all' || link.roles.includes(currentUser.role));

    return <>
        {currentUserLinks.map(link => <Button
            variant="secondaryGhost"
            asChild
        >
            <NavLink to={link.path}>{link.label}</NavLink>
        </Button>)}
        <Button
            variant="secondaryGhost"
            onClick={handleLogout}
        >
            Logout
        </Button>
    </>
}


export default AuthorizedLinks;