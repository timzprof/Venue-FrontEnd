import React, {useState, useContext} from 'react'
import styles from './login.module.css'
import Header from '../../components/UI/header/header' 
import Button from '../../components/UI/button/button'
import { NotificationContext } from '../../contexts/notificationContext'
import Notification from '../../components/UI/notification/notification'
import FetchHelper from '../../helpers/fetchHelper'
import {AuthContext} from '../../contexts/AuthContext'
import { Redirect } from 'react-router-dom'

const Login = () => {

    const [notification, setNotification] = useContext(NotificationContext) 
    const [authState, setToken] = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [actionBtnLoading, setActionBtnLoading] = useState()
    const [redirect, setRedirect] = useState()

    const submitForm = (e) => {
        e.preventDefault();
        setActionBtnLoading(true)
        const formBody = {
            email: email,
            password: password
        }
        FetchHelper('/api/v1/auth/login', 'POST', formBody)
        .then((res) => res.json())
        .then((data) => {
            console.log("returning login body", data)
            if (data.status === "success"){
                setToken(data.token)
                setActionBtnLoading(false)
                setRedirect(true)
            }else{
                setActionBtnLoading(false)
                setNotification({
                    open: true,
                    success: false,
                    text: "Invalid Login Credentials"
                })
            } 
        })
        .catch(error => {
            setActionBtnLoading(false)
            setNotification({
                open: true,
                success: false,
                text: "There was an error loggin in"
            })
        })
    }

    if(redirect){
        return (<Redirect to="/"/>)
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
                    <Button type="submit" loading={actionBtnLoading} className={styles.btn} action={submitForm} text="Log in" style={{
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
