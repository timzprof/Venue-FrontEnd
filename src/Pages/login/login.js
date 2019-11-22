import React, {useState, useContext} from 'react'
import styles from './login.module.css'
import Header from '../../components/UI/header/header' 
import Button from '../../components/UI/button/button'
import { NotificationContext } from '../../contexts/notificationContext'
import Notification from '../../components/UI/notification/notification'
import FetchHelper from '../../helpers/fetchHelper'
import {AuthContext} from '../../contexts/AuthContext'

const Login = () => {

    const [notification, setNotification] = useContext(NotificationContext) 
    const [authState, setToken] = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = (e) => {
        e.preventDefault();
        const formBody = new FormData()
        formBody.append("email", email)
        formBody.append("password", password)

        FetchHelper('/api/v1/auth/login', 'POST', formBody)
        .then((res) => res.json())
        .then((data) => {
            setToken(data.token)
        })

        if (email != 'test' || password != 'test'){
            setNotification({
                open: true,
                success: false,
                text: "Invalid Login Credentials"
            })
        }
    }



    return (
        <div className={styles.Login}>
            <Header plain/>
            <Notification/>
            <div className={styles.loginBox}>
                <h2 className={styles.formHeader}>
                    Log In
                </h2>
                <form action="">
                    <div className={styles.formGroup}>
                        <label htmlFor="">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                    </div>
                    <Button type="submit" action={submitForm} text="Log in" style={{
                        backgroundColor: "#083a55",
                        color: "#fff",
                        padding: "12px 45px",
                        marginTop: "15px",
                        float: "right"
                    }
                    }/>
                </form>
            </div>
        </div>
    )
}

export default Login
