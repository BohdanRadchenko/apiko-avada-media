import React, {createRef, useEffect, useState} from 'react';
import css from './Modal.module.css';

const Modal = ({onClose, location, name, title}) => {
    const defaultForm = {message: ''}
    const [form, setForm] = useState(defaultForm)
    const backdropRef = createRef();

    const handleKeyPress = e => {
        if (e.code !== 'Escape') return;
        window.removeEventListener('keydown', handleKeyPress);
        onClose();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
    })

    const handleBackdropClick = e => {
        const {current} = backdropRef;
        if (current && e.target !== current) {
            return;
        }
        onClose();
    };

    const changeHandler = e => {
       setForm({...form, [e.target.name]: e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault()
        onClose()
    }

    return (
        <div
            className={css.backdrop}
            ref={backdropRef}
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                <div className={css.header}>
                    <h1 className={css.title}>Contact seller</h1>
                    <button
                        onClick={e => onClose()}
                        className={css.closeButton}/>
                </div>

                <form
                    onSubmit={e => submitHandler(e)}
                    className={css.from}
                    action="">
                    <div className={css.subjectWrapper}>
                        <p> Subject:</p>
                        <p>{title}</p>
                    </div>
                    <div className={css.profileWrapper}>
                        <div className={css.avatarWrapper}>
                            <div className={css.avatar}/>
                        </div>
                        <div className={css.userDataWrapper}>
                            <h2 className={css.userName}>
                                {name}
                            </h2>
                            <p className={css.userLocation}>
                                {location}
                            </p>
                        </div>
                    </div>
                    <div className={css.messgeWrapper}>
                        <label className={css.label} htmlFor="message">Message</label>
                        <textarea className={css.textarea}
                                  value={form.message}
                                  name='message'
                                  onChange={e => changeHandler(e)}
                                  placeholder="For example: Iron man suit"
                                  id="message"/>
                    </div>
                    <button className={css.submitBtn}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Modal
