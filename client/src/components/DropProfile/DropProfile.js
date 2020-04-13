import React, {useContext, useEffect, useState} from "react";
import axios from 'axios'
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import css from './DropProfile.module.css'

const DropProfile = () => {
    const [active, setActive] = useState(false)
    const [userData, setUserData] = useState(null)
    const auth = useContext(AuthContext)
    const userId = auth.id

    useEffect(() => {
        axios.get(`/api/users/${userId}`)
            .then(data => setUserData(data.data.user))
    }, [userId])

    const logoutHandler = e => {
        auth.logout()
    }

    const handleActive = e => {
        setActive(!active)
    }

    return (
        <div className={css.wrapper}>
            <div
                onClick={e => handleActive(e)}
                className={css.container}>
                <div className={css.photoProfile}/>
            </div>

            {active && (
                <div
                    className={css.dropDownWrapper}>
                    {userData && (
                    <div className={css.descriptions}>
                        <div className={css.leftSide}>
                            <div className={css.photoWrapper}>
                                <div className={css.photoProfile}/>
                            </div>
                        </div>
                        <div className={css.rightSide}>
                            <h2 className={css.name}>
                                {userData.name}
                            </h2>
                            <p className={css.email}>
                                {userData.email}
                            </p>
                            <NavLink
                                to={`/profile/${userId}`}
                                className={css.linkProfile}>
                                Profile
                            </NavLink>
                        </div>
                    </div>
                    )}

                    <NavLink
                        to='/profile/edit'
                        className={css.linkEditProfile}>
                        Edit profile
                    </NavLink>
                    <button
                        onClick={e => logoutHandler(e)}
                        className={css.logout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default DropProfile