import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import css from './CardItem.module.css'
import axios from "axios";

const CardItem = ({_id, title, price, img}) => {
    const [userFavorites, setUserFavorites] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.id

    useEffect(() => {
        if (auth.isAuthenticated) {
            axios.get(`/api/users/${userId}`)
                .then(data => setUserFavorites(data.data.user.favorites))
        }
    }, [auth.isAuthenticated, userId])

    return (
        <div className={css.container}>

            <div className={css.photoWrapper}>
                <div className={css.photoInner}>
                    <div className={css.photoContent}>
                        <div className={css.photo}/>

                        {auth.isAuthenticated && (
                            <div className={css.favIcoWrapper}>
                                {!!userFavorites.length && (
                                    <div className={userFavorites.includes(_id) ? css.favIcoFill : css.favIco}/>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <div className={css.descriptions}>
                <h2 className={css.title}>
                    {title}
                </h2>
                <p className={css.price}>
                    <span>&#36;</span>{price}
                </p>
            </div>
        </div>
    )
}

export default CardItem