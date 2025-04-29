import {Route, Routes} from "react-router-dom";
import Home from "../../pages/Home";

const AuthorizedRoutes = () => {
    return <Routes>
        <Route path="/" element={<Home/>}/>
    </Routes>
}

export default AuthorizedRoutes;