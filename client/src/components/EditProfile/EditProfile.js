import React, {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import css from './EditProfile.module.css'

const EditProfile = () => {
    const defaulForm = {name: '', phone: '', photo: ''}
    const [form, setForm] = useState(defaulForm)
    const [userData, setUserData] = useState(null)
    const history = useHistory()
    const auth = useContext(AuthContext)
    const userId = auth.id

    useEffect(() => {
        if(!auth.isAuthenticated) {
            history.push('/login')
        }
    }, [auth.isAuthenticated, history])

    useEffect(() => {
        axios.get(`/api/users/${userId}`)
            .then(data => {
                setUserData(data.data.user)
            })
    }, [userId, form])

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const uploadFile = async (e) => {
        e.persist();
        const file = e.target.files[0];
        setForm({...form, photo: file})
    };

    const submitHandler = e => {
        e.preventDefault();
        if(form.name || form.phone) {
        axios.patch('/api/users/profile/edit', {form}, {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(data => setForm(defaulForm))
        }
    };

    return (
        <>
            {userData && auth.isAuthenticated && (
                <div className={css.container}>
                    <h1 className={css.title}>Edit profile</h1>
                    <form
                        onSubmit={e => submitHandler(e)}
                        className={css.form}>

                        <div className={css.photoWrapper}>
                            <img src="" alt=""/>
                            <button onClick={e => uploadFile(e)}
                                className={css.upgradeBtn}>
                                Upgrade Photo
                            </button>
                        </div>
                        {/*NAME*/}
                        <label className={css.label} htmlFor="name">Full name</label>
                        <input className={css.input}
                               value={form.name}
                               name='name'
                               onChange={e => changeHandler(e)}
                               placeholder={userData.name ? userData.name : "Tony Stark"}
                               id="name"
                               type="text"/>

                        {/*PHONE*/}
                        <label className={css.label} htmlFor="phone">Phone number</label>
                        <input className={css.input}
                               minLength="13"
                               maxLength="13"
                               value={form.phone}
                               name='phone'
                               onChange={e => changeHandler(e)}
                               pattern={'^[+]{0,1}380([0-9]{9})$'}
                               placeholder={userData.phone !== '' ? userData.phone : "+380 XX XXX XX XX"}
                               id="phone"
                               type="tel"/>
                        <button type="submit" className={css.submitBtn}>Save</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default EditProfile