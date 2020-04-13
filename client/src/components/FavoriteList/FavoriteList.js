import React, {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext";
import CardItem from "../CardList/CardItem/CardItem";
import css from './FavoriteList.module.css'

const FavoriteList = () => {
    const [items, setItems] = useState(null)
    const history = useHistory()
    const auth = useContext(AuthContext)

    useEffect(() => {
        axios.get('/api/products/get/fav', {headers: { Authorization : `Bearer ${auth.token}`}})
            .then(data => setItems(data.data.userFavorites))
    }, [auth.token])

    const handleProducts = (e, el) => {
        history.push(`/product/${el._id}`)
    }

    return  (
        <>
            {items && (
                <div className={css.container}>
                    <ul className={css.cardList}>
                        {items.map(el => (
                            <li
                                onClick={e => handleProducts(e, el)}
                                className={css.cardItem}
                                key={el._id}>
                                <CardItem {...el}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default FavoriteList