import React, {useContext, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import css from './RegisterForm.module.css'

const LoginForm = ({handlerAuthentication}) => {
    const defaultForm = {email: '', name: '', password: '', passwordAgain: ''};
    const [form, setForm] = useState(defaultForm);
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordAgain, setShowPasswordAgain] = useState(false)
    const {request} = useHttp()
    const history = useHistory()
    const auth = useContext(AuthContext)

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const submitHandler = async e => {
        e.preventDefault();
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            if(data.token) {
                auth.login(data.token, data.userId)
                history.push('/home')
            }

        } catch (e) {

        }
        setShowPassword(false)
        setShowPasswordAgain(false)
        setForm(defaultForm);
    };

    const HandlerShowPassword = (e) => {
        e.preventDefault();
        if (e.target.name === 'password') {
            setShowPassword(!showPassword)
        }
        if (e.target.name === 'passwordAgain') {
            setShowPasswordAgain(!showPasswordAgain)
        }
    }
    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <form className={css.form}
                      onSubmit={e => submitHandler(e)}
                >
                    <h2 className={css.title}>Register</h2>

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

                    {/*NAME*/}
                    <label className={css.label} htmlFor="name">Full name</label>
                    <input className={css.input}
                           required
                           value={form.name}
                           name='name'
                           onChange={e => changeHandler(e)}
                           placeholder="Tony Start"
                           id="name"
                           type="text"/>

                    {/*PASSWORD*/}
                    <div className={css.passwordInner}>
                        <label className={css.label} htmlFor="password">Password</label>
                        <input className={css.input}
                               autoComplete="off"
                               required
                               value={form.password}
                               name='password'
                               onChange={e => changeHandler(e)}
                               id="password"
                               type={showPassword ? 'text' : 'password'}/>
                        <button
                            name='password'
                            type='button'
                            onClick={(e) => HandlerShowPassword(e)}
                            className={css.showPassword}/>
                    </div>

                    {/*PASSWORD AGAIN*/}
                    <div className={css.passwordInner}>
                        <label className={css.label} htmlFor="passwordAgain">Password again</label>
                        <input className={css.input}
                               autoComplete="off"
                               required
                               value={form.passwordAgain}
                               name='passwordAgain'
                               onChange={e => changeHandler(e)}
                               id="passwordAgain"
                               type={showPasswordAgain ? 'text' : 'password'}/>
                        <button
                            name='passwordAgain'
                            type='button'
                            onClick={(e) => HandlerShowPassword(e)}
                            className={css.showPassword}/>
                    </div>

                    <button
                        className={css.submitBtn}
                        // onClick={e => submitHandler(e)}
                    >
                        Register
                    </button>

                </form>

                <div className={css.regWrapper}>
                    <div className={css.textWrapper}>
                        <p>
                            I already have an account,
                        </p>
                        <NavLink to='/login' className={css.registerLink}> LOG IN</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm