import React, {createContext, useEffect, useState} from 'react';
import {get, save} from "../utils/actionsBuilder";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [currentUser, setCurrentUser] = useState(null);
    const actions = {
        getUser: () => get('/users/me'),
        signIn: (credentials) => save('/users/me', 'POST', {credentials}),
    }
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            getUser();
        } else {
            localStorage.removeItem('token');
            setCurrentUser(null);
        }
    }, [token]);

    const getUser = async () => {
        try {
            const user = await actions.getUser();
            setCurrentUser(user);
        } catch {
            logout();
        }
    };

    const login = async (credentials) => {
        const token = await actions.signIn(credentials);
        setToken(token);
    };

    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;