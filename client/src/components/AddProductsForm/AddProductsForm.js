import React, {useContext, useState} from "react";
import axios from 'axios'
import {createFormData} from "../../helpers/formData.helpers";
import {AuthContext} from "../../context/AuthContext";
import css from './AddProductsForm.module.css'

const AddProductsForm = () => {
    const defaultForm = {title: '', location: '', description: '', price: '', photo : ' '};
    const [form, setForm] = useState(defaultForm);
    const [imgUrl, setImgUrl] = useState(null)
    const auth = useContext(AuthContext)

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const uploadFile = async (e) => {
        e.persist();
        const files = e.target.files[0]
        const reader = new FileReader();
        reader.onload = function (e) {
            setImgUrl(e.target.result)
        }
        reader.readAsDataURL(files);
        const file = e.target.files[0];
        setForm({...form, photo: file})
    };

    const handleSubmitForm = e => {
        e.preventDefault()
        const data = createFormData(form);
        axios.post('/api/products/create', data,  {headers: { 'Content-Type': 'multipart/form-data', Authorization : `Bearer ${auth.token}`}})
            .then(date => console.log(date.data.message))
        // setForm(defaultForm)
        // setImgUrl(null)
    }

    return (
        <div className={css.container}>
            <h2 className={css.title}>
                Add product
            </h2>
            <form
                onSubmit={e => handleSubmitForm(e)}
                className={css.form}>

                {/*TITLE*/}
                <label type='required' className={css.label} htmlFor="title">Title</label>
                <input className={css.input}
                       required
                       value={form.title}
                       name='title'
                       onChange={e => changeHandler(e)}
                       placeholder="For example: Iron man suit"
                       id="title"
                       type="text"/>

                {/*LOCATION*/}
                <label type='required' className={css.label} htmlFor="location">Location</label>
                <input className={css.input}
                       required
                       value={form.location}
                       name='location'
                       onChange={e => changeHandler(e)}
                       placeholder="For example: Los Angeles, CA"
                       id="location"
                       type="text"/>

                {/*DESCRIPTION*/}
                <label className={css.label} htmlFor="description">description</label>
                <textarea className={css.textarea}
                          value={form.description}
                          name='description'
                          onChange={e => changeHandler(e)}
                          placeholder="For example: Iron man suit"
                          id="description"/>


                {/*PHOTOS*/}
                <label htmlFor="file" className={css.label}>Photos</label>
                <div className={css.photoWrapper}>
                    {imgUrl && (
                        <img
                            className={css.preview}
                            src={imgUrl} alt=""/>
                    )}
                    <label htmlFor="file" className={css.labelFile}/>
                    <input type="file"
                           // multiple
                           name="photo"
                           id="file"
                           accept=".jpg, .jpeg, .png"
                           className={css.inputFile}
                           onChange={e => uploadFile(e)}
                    />
                </div>

                {/*PRICE*/}
                <label className={css.label} htmlFor="price">Price</label>
                <input className={css.input}
                       value={form.price}
                       name='price'
                       onChange={e => changeHandler(e)}
                       placeholder="For example: Los Angeles, CA"
                       id="price"
                       type="text"/>

                <button type="submit" className={css.button}>Submit</button>
            </form>
        </div>
    )
}

export default AddProductsForm