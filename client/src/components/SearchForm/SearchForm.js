import React, {useState} from "react";
import css from './SearchForm.module.css'

const SearchForm = () => {
    const defaultForm = {name: '', location: ''}
    const [form, setForm] = useState(defaultForm)

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const submitHandler = e => {
        e.preventDefault();
        setForm(defaultForm);
    };

    return (
        <div className={css.container}>
            <form
                onSubmit={e => submitHandler(e)}
                className={css.searchForm}>

                <div className={css.nameWrapper}>
                <input className={css.inputName}
                       value={form.name}
                       name='name'
                       onChange={e => changeHandler(e)}
                       placeholder="Search products by name"
                       type="text"/>
                </div>

                <div className={css.locationWrapper}>
                    <input className={css.inputlocation}
                           value={form.location}
                           name='location'
                           onChange={e => changeHandler(e)}
                           placeholder="Location"
                           type="text"/>
                </div>

                <button
                    className={css.submitBtn}
                    type='submit'>
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchForm