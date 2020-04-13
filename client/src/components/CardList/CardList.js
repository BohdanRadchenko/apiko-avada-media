import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import CardItem from "./CardItem/CardItem";
import css from './CardList.module.css'

const CardList = () => {
    const [items, setItems] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get('/api/products/')
            .then(data => setItems(data.data.products))
    }, [])

    const handleProducts = (e, el) => {
        history.push(`/product/${el._id}`)
    }

    return (
        <>
            {items && (
                <div className={css.container}>
                    <ul className={css.cardList}>
                        {items.map(el => (
                            <li onClick={e => handleProducts(e, el)}
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

export default CardList