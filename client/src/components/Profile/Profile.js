import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import css from './Profile.module.css'
import CardItem from "../CardList/CardItem/CardItem";

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const history = useHistory()
    const id = history.location.pathname.split('/').splice(2)[0]

    useEffect(() => {
        axios.get(`/api/users/products/${id}`)
            .then(data => setProfile(data.data.profile))
    }, [id])

    return (
        <>
        {profile && (
        <div className={css.container}>

            {profile.user && (
            <>
            <div className={css.userInfo}>
                <div className={css.photoWrapper}>
                    <img src="" alt=""/>
                </div>
                <h2 className={css.userName}>{profile.user.name}</h2>
                <p className={css.userLocation}>{profile.user.location}</p>
            </div>

                <ul className={css.userStats}>
                    <li className={css.statsFeedback}>
                        <p className={css.statsPercent}>88%</p>
                        <p className={css.statsTitle}>Positive feedback</p>
                    </li>
                    <li className={css.statsSales}>
                        <p className={css.statsPercent}>123</p>
                        <p className={css.statsTitle}>Sales</p>
                    </li>
                    <li className={css.statsListings}>
                        <p className={css.statsPercent}>{profile.products.length}</p>
                        <p className={css.statsTitle}>Active listings</p>
                    </li>
                </ul>
            </>
            )}

            {profile.products && (
                <ul className={css.cardList}>
                    {profile.products.map(el => (
                        <li
                            className={css.cardItem}
                            key={el._id}>
                            <CardItem {...el}/>
                        </li>
                    ))}
                </ul>
            )}


        </div>
        )}
        </>
    )
}

export default Profile