import React, {useState} from 'react'
import styles from './login.module.css'
import Header from '../../components/UI/header/header' 
import Button from '../../components/UI/button/button'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = () => {
        
    }

    return (
        <div className={styles.Login}>
            <Header/>
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
                    <Button onClick={submitForm} text="Log in" style={{
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
