import React, {useState} from "react";
import css from './ResetForm.module.css'

const ResetForm = () => {
    const defaultForm = {email: ''};
    const [form, setForm] = useState(defaultForm);

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const submitHandler = e => {
        e.preventDefault();
        setForm(defaultForm);
    };

    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <form className={css.form}
                      onSubmit={e => submitHandler(e)}
                >
                    <h2 className={css.title}>Restore Password</h2>

                    {/*EMAIL*/}
                    <label className={css.label} htmlFor="email">Email</label>
                    <input className={css.input}
                           required
                           value={form.email}
                           name='email'
                           onChange={e => changeHandler(e)}
                           placeholder="Example@gmail.com"
                           id="email"
                           type="email"/>

                    <button
                        className={css.submitBtn}
                        type='submit'>
                        Continue
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ResetForm