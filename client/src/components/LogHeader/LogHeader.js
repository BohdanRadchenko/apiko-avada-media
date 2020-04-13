import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import css from './LogHeader.module.css'


const LogHeader = () => {
    const pathname = useHistory().location.pathname
    return (
            <div className={css.container}>

                <NavLink to="/home"
                    className={pathname === '/register' ?
                    css.logoOrange : css.logo
                    }>
                </NavLink>

                <nav className={css.navigations}>
                    <button className={css.button}>
                        sell
                    </button>
                    <NavLink to="/login" className={css.loginLink}>
                        login
                    </NavLink>
                    <NavLink to="favorite" className={css.favorite} />
                </nav>
            </div>
    )
}

export default  LogHeader