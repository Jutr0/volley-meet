import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {appConfig} from "./config/applicationConfiguration";
import axios from "axios";
import AuthProvider from "./contexts/AuthContext";

axios.defaults.baseURL = appConfig.apiUrl
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.request.use(cfg => {
    const token = localStorage.getItem('token');
    if (token) {
        cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
});

axios.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            // localStorage.removeItem('token');
            if (window.location.pathname !== '/login') {
                // window.location.href = '/login';
            }
        }
        return Promise.reject(err);
    }
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
                <AuthProvider>
                    <App/>
                </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
