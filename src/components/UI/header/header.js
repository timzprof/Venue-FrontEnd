import React from 'react'
import styles from './header.module.css'
import { NavLink } from 'react-router-dom'
import { ReactComponent as LogoutImage } from '../../../assets/images/logout.svg'


const Header = () => {
    return (
        <div className={styles.Header}>
            <h2 className={styles.Logo}>Venues App</h2>
            {/* <NavLink to="/login">Login</NavLink> */}
            <NavLink to="/Logout"> <span className={styles.flex}> <LogoutImage/> Logout </span> </NavLink>
        </div>
    )
}

export default Header
