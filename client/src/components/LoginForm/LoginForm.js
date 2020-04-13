import React, {useContext, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import css from './LoginForm.module.css'

const LoginForm = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const defaultForm = {email: '', password : ''};
    const [form, setForm] = useState(defaultForm);
    const [showPassword, setShowPassword] = useState(false)
    const {request} = useHttp()

    const changeHandler = e => {
            setForm({...form, [e.target.name]: e.target.value})
    };

    const submitHandler = async e => {
        e.preventDefault();
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            if(data.token) {
                history.push('/home')
            }
        } catch (e) {

        }
        setShowPassword(false)
        setForm(defaultForm);
    };

    const HandlerShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
        console.log(e)
    }
    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <form className={css.form}
                      onSubmit={e => submitHandler(e)}
                >
                    <h2 className={css.title}>Login</h2>

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

                    {/*PASSWORD*/}
                    <div className={css.passwordInner}>
                    <label className={css.label} htmlFor="password">Password</label>
                    <input className={css.input}
                           autoComplete='off'
                           required
                           value={form.password}
                           name='password'
                           onChange={e => changeHandler(e)}
                           id="password"
                           type={showPassword ? 'text' : 'password'}/>
                    <button
                        type='button'
                        onClick={(e) => HandlerShowPassword(e)}
                        className={css.showPassword}/>

                        <NavLink
                            className={css.resetPassword}
                            to='/reset'>
                            Don’t remember password?
                        </NavLink>
                    </div>

                    <button
                    className={css.submitBtn}
                        type='submit'>
                        Continue
                    </button>


                </form>

            <div className={css.regWrapper}>
                <div className={css.textWrapper}>
                <p>
                    I have no account,
                </p>
                <NavLink to='/register' className={css.registerLink}> REGISTER NOW</NavLink>
                </div>
            </div>
            </div>
        </div>
    )
}

export default LoginForm