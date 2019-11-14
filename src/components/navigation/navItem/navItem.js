import React from 'react'
import styles from './navItem.module.css'
import { NavLink } from 'react-router-dom'

const NavItem = ({ path, text }) => {
    return (
        <NavLink to={path} exact activeClassName={styles.active}>
            <div className={styles.NavItem}>
                <span>{text}</span>
            </div>
        </NavLink>
    )
}

export default NavItem
