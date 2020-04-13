import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import SearchForm from "../SearchForm/SearchForm";
import DropProfile from "../DropProfile/DropProfile";
import css from './Header.module.css'

const Header = () => {
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
                    {auth.isAuthenticated && (<NavLink to='/inbox'  className={css.inboxOn}/>)}
                    <button
                        onClick={e => handleClickSell(e)}
                        className={css.button}>
                        sell
                    </button>
                    {!auth.isAuthenticated && (
                    <NavLink to="/login" className={css.loginLink}>
                        login
                    </NavLink>
                    )}
                    {auth.isAuthenticated && (<DropProfile/>)}
                    <NavLink to="/product/favorite" className={
                        pathname === '/product/favorite'? css.favoriteCheked : css.favorite}/>
                </nav>
                </div>
            </div>
                <SearchForm/>
        </div>
    )
}

export default Header