import {Route, Routes} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {ROLES} from "../../../utils/constants";
import Users from "../../pages/Users";
import Teams from "../../pages/teams/Teams";
import Team from "../../pages/teams/Team";
import MyTeam from "../../pages/MyTeam";
import Invitations from "../../pages/Invitations";

const routes = [
    {path: '/superadmin/users', component: <Users/>, roles: [ROLES.SUPERADMIN]},
    {path: '/superadmin/teams', component: <Teams/>, roles: [ROLES.SUPERADMIN]},
    {path: '/superadmin/teams/:id', component: <Team/>, roles: [ROLES.SUPERADMIN]},
    {path: '/my-team', component: <MyTeam/>, roles: [ROLES.USER]},
    {path: '/invitations', component: <Invitations/>, roles: [ROLES.USER]}
]

const AuthorizedRoutes = () => {
    const {currentUser} = useContext(AuthContext);

    const currentUserRoutes = routes.filter(route => route.roles === 'all' || route.roles.includes(currentUser.role))
    return <Routes>
        {currentUserRoutes.map(route => <Route
            key={route.path} path={route.path} element={route.component}/>)}
    </Routes>
}

export default AuthorizedRoutes;