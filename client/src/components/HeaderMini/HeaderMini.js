import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import DropProfile from "../DropProfile/DropProfile";
import css from './HeaderMini.module.css'

const HeaderMini = () => {
    const auth = useContext(AuthContext)
    const pathname = useHistory().location.pathname
    const history = useHistory()

    const handleClickSell = e => {
        history.push('/create')
    }

    return (
        <div className={css.backgroundWrapper}>
            <div className={css.container}>
                <div className={css.mainWrapper}>
                    <NavLink
                        to="/home"
                        className={css.logo}>
                    </NavLink>

                    <nav className={css.navigations}>
                        {pathname !== 'create' && pathname !== 'edit' && (
                        <button
                            onClick={e => handleClickSell(e)}
                            className={css.button}>
                            sell
                        </button>
                        )}
                        {!auth.isAuthenticated && (
                            <NavLink to="/login" className={css.loginLink}>
                                login
                            </NavLink>
                        )}
                        {auth.isAuthenticated && (<DropProfile/>)}
                        <NavLink to="favorite" className={
                            pathname === '/favorite'? css.favoriteCheked : css.favorite}/>
                    </nav>
                    <div className={css.burgerButtonWrapper}>
                        <button className={css.burgerButton}>
                            <div className={css.burgerButtonLineOne}/>
                            <div className={css.burgerButtonLineTwo}/>
                            <div className={css.burgerButtonLineThree}/>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderMini