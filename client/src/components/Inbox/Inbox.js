import React, {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import css from './Inbox.module.css'

const Inbox = () => {
    const [chatIsOpen, setChatIsOpen] = useState(false)
    const history = useHistory()
    const auth = useContext(AuthContext)

    const handleChatClick = e => {
        setChatIsOpen(!chatIsOpen)
    }

    useEffect(() => {
        if (!auth.isAuthenticated) {
            history.push('/login')
        }
    }, [auth.isAuthenticated, history])

    return (
        <div className={css.container}>

            <div className={chatIsOpen ? css.leftSideFalse : css.leftSide}>
                <ul className={css.chatList}>
                    <li onClick={e => handleChatClick(e)}
                        className={css.chatItem}>
                        <div className={css.messageInfoWrapper}>
                            <div className={css.infoUser}>
                                <h2 className={css.userInfoName}>Kathryn Lane</h2>
                                <p className={css.userInfoDesc}>
                                    dolor sunt consectetur non
                                </p>
                            </div>
                            <div className={css.infoProduct}>
                                <div className={css.productImage}/>
                                <div className={css.productDesc}>
                                    <h2 className={css.productInfoTitle}>nostrud veniam esse</h2>
                                    <p className={css.productInfoPrice}>$642</p>
                                </div>
                            </div>
                        </div>
                        <div className={css.messageTimeWrapper}>
                            <p className={css.messageTime}>
                                05:27
                            </p>
                        </div>
                    </li>
                    <li target={'active'}
                        onClick={e => handleChatClick(e)}
                        className={css.chatItem}>
                        <div className={css.messageInfoWrapper}>
                            <div className={css.infoUser}>
                                <h2 className={css.userInfoName}>Lily Alexander</h2>
                                <p className={css.userInfoDesc}>
                                    sit elit elit eu
                                </p>
                            </div>
                            <div className={css.infoProduct}>
                                <div className={`${css.productImage} ${css.secondImage}`}/>
                                <div className={css.productDesc}>
                                    <h2 className={css.productInfoTitle}>aliqua id duis</h2>
                                    <p className={css.productInfoPrice}>$633</p>
                                </div>
                            </div>
                        </div>
                        <div className={css.messageTimeWrapper}>
                            <p className={css.messageTime}>
                                18:48
                            </p>
                        </div>
                    </li>

                    <li onClick={e => handleChatClick(e)}
                        className={css.chatItem}>
                        <div className={css.messageInfoWrapper}>
                            <div className={css.infoUser}>
                                <h2 className={css.userInfoName}>Brandie Steward</h2>
                                <p className={css.userInfoDesc}>
                                    eu nisi nulla ut
                                </p>
                            </div>
                            <div className={css.infoProduct}>
                                <div className={`${css.productImage} ${css.thirdImage}`}/>
                                <div className={css.productDesc}>
                                    <h2 className={css.productInfoTitle}>consectetur elit duis</h2>
                                    <p className={css.productInfoPrice}>$731</p>
                                </div>
                            </div>
                        </div>
                        <div className={css.messageTimeWrapper}>
                            <p className={css.messageTime}>
                                16:20
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className={chatIsOpen ? css.rightSide : css.rightSideFalse}>

                <div className={css.chatHeader}>

                    <button onClick={handleChatClick} className={css.arrowButtonBack} />

                    <div className={css.currentInfo}>
                        <div className={css.currentUser}>
                            <div className={css.currentUserPhoto}/>
                            <div className={css.currentUserNameWrapper}>
                                <h2 className={css.currentUserName}>
                                    Walter Stevenson
                                </h2>
                            </div>
                        </div>
                        <div className={css.currentProductInfo}>
                            <div className={css.currentProductPhoto}/>
                            <div className={css.currentProductDesc}>
                                <h2 className={css.currentProductTitle}>
                                    aliqua id duis
                                </h2>
                                <p className={css.currentProductPrice}>
                                    $633
                                </p>
                            </div>
                            <button className={css.currentProductButtonOpen}/>
                        </div>
                    </div>
                    <button className={css.moreButton}>
                        <div className={css.buttonPointOne}/>
                        <div className={css.buttonPointTwo}/>
                        <div className={css.buttonPointThree}/>
                    </button>
                </div>

                <ul className={css.messageList}>
                    <li message='me'
                        className={css.messageItem}>
                        <div className={css.messageTextWrapper}>
                            <p className={css.messageText}>
                                Hello! How are you?
                            </p>
                            <p className={css.messageTextTime}>
                                8 minutes ago
                            </p>
                        </div>
                    </li>

                    <li message='for'
                        className={css.messageItem}>
                        <div className={css.messageTextWrapper}>
                            <p className={css.messageText}>
                                I am good, thank you, what about you? Check this picture
                            </p>
                            <p className={css.messageTextTime}>
                                6 minutes ago
                            </p>
                        </div>
                    </li>

                    <li message='for'
                        className={css.messageItem}>
                        <div className={css.messageTextWrapper}>
                            <div className={css.shareFile}>
                                <div className={css.laptop}/>
                                <div className={css.laptopDesc}>
                                    <p>
                                        laptop.jpg
                                    </p>
                                    <p>
                                        1,5 MB
                                    </p>
                                </div>

                            </div>
                            <p className={css.messageTextTime}>
                                5 minutes ago
                            </p>
                        </div>
                    </li>

                </ul>

                <div className={css.textareaWrapper}>
                    <textarea className={css.textarea}
                              // value={form.message}
                              name='message'
                              placeholder="Type your message here.."
                              id="message"/>
                </div>
            </div>

        </div>
    )
}

export default Inbox