import React, {useContext} from 'react';
import AuthorizedLinks from "./AuthorizedLinks";
import UnauthorizedLinks from "./UnauthorizedLinks";
import {AuthContext} from "../../../contexts/AuthContext";
import {formatUserName} from "../../../utils/formatters/user";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="bg-primary h-16 flex items-center px-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
          <span className="text-xl font-semibold text-primary-foreground">
            Volley Meet
          </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        {currentUser ? <AuthorizedLinks/> : <UnauthorizedLinks/>}
                    </div>

                    {currentUser && (
                        <div className="text-sm text-primary-foreground/80 ml-2">
                            {formatUserName(currentUser)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
