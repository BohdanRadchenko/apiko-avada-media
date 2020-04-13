import React, {Suspense} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "../routes";
import {Loaders} from "./Loaders";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/AuthContext";
import css from './App.module.css'

const App = () => {
    const {token, login, logout, id} = useAuth()
    const isAuthenticated = !!token;
    const routes = useRoutes()
    return (
        <div className={css.container}>
            <AuthContext.Provider value={{
                token, login, logout, id, isAuthenticated
            }}>
                <Suspense fallback={<Loaders/>}>
                    <Router>
                        {routes}
                    </Router>
                </Suspense>
            </AuthContext.Provider>
        </div>
    )
}

export default App