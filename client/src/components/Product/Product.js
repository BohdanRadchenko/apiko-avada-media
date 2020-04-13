import React, {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Modal from "../Modal/Modal";
import css from './Product.module.css'
import {AuthContext} from "../../context/AuthContext";

const Product = () => {
    const [loading, setLoading] = useState(false)
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [userFavorites, setUserFavorites] = useState([])
    const [product, setProduct] = useState(null)
    const [user, setUser] = useState()
    const [modalSate, setModalState] = useState(false)
    const id = history.location.pathname.split('/').splice(2)[0]
    const userId = auth.id

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(data => {
                const prod = data.data.products
                const day = new Date(prod.date).toString().split(' ')[2]
                const month = new Date(prod.date).toString().split(' ')[1]
                const time = new Date(prod.date).toString().split(' ')[4].split(':').slice(0, 2).join(':')
                prod.date = `${day} ${month} ${time}`
                setProduct(prod)
            })
    }, [id])

    useEffect(() => {
        if (product) {
            const userId = product.user
            axios.get(`/api/users/${userId}`)
                .then(data => setUser(data.data.user))
        }
    }, [product])

    const openModalHandler = e => {
        setModalState(true)
    }

    const closeModalHandler = e => {
        setModalState(false)
    }

    const favoriteHandler = e => {
        setLoading(true)
        axios.patch('/api/users/fav/add', {productId : product._id},  {headers: {'Content-Type': 'application/json' , Authorization : `Bearer ${auth.token}`}})
            .then(data => setLoading(false))
    }

    useEffect(() => {
        if (auth.isAuthenticated) {
            axios.get(`/api/users/${userId}`)
                .then(data => setUserFavorites(data.data.user.favorites))
        }
    }, [loading, auth.isAuthenticated, userId])

    const handleClickProfile = e => {
        history.push(`/profile/${user._id}`)
    }

    return (
        <>
            {modalSate && product && (
                <Modal onClose={closeModalHandler} {...user} title={product.title}/>
            )}
            {product && (
                <div className={css.container}>

                    <div className={css.wrapper}>
                        <div className={css.leftSide}>
                            <div className={css.imageWrapper}>
                                <div className={css.image}/>
                            </div>
                            <div className={css.description}>
                                <div className={css.priceWrapper}>
                                    <p className={css.price}>
                                        <span>&#36;</span>{product.price}
                                    </p>
                                </div>
                                <div className={css.titleWrapper}>
                                    <h1 className={css.title}>
                                        {product.title}
                                    </h1>
                                    <p className={css.date}>
                                        {product.date}
                                    </p>
                                </div>
                                <div className={css.locationWrapper}>
                                    <p className={css.location}>
                                        {product.location}
                                    </p>
                                </div>
                                <div className={css.descWrapper}>
                                    <p className={css.desc}>
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {user && (
                            <div className={css.rightSide}>
                                <div
                                    onClick={e => handleClickProfile(e)}
                                    className={css.profile}>
                                    <div className={css.photoWrapper}>
                                        <div className={css.photoInner}>
                                            <div className={css.photo}/>
                                        </div>
                                    </div>
                                    <h2 className={css.userName}>
                                        {user.name}
                                    </h2>
                                    <p className={css.userLocation}>
                                        {user.location}
                                    </p>
                                </div>
                                <div className={css.chatWrapper}>
                                    <button
                                        onClick={e => openModalHandler(e)}
                                        className={css.chatBtn}>
                                        Chat with seller
                                    </button>
                                </div>
                                <div className={css.addFavoriteWrapper}>
                                    {auth.isAuthenticated && (
                                        <button
                                            disabled = {userFavorites.includes(product._id) && !loading ? true :  false}
                                            onClick={e => favoriteHandler(e)}
                                            className={css.addFavoriteBtn}>
                                            {userFavorites.includes(product._id) ? 'favorite' :  'Add to favorite'}
                                        </button>
                                    )}
                                    {!auth.isAuthenticated && (
                                        <p
                                            className={css.addFavoriteBtn}>
                                            Login to add to favorites
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Product