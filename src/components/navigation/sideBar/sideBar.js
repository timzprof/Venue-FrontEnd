import React from 'react'
import styles from './sideBar.module.css'
import NavItem from  '../navItems/navItems'

const SideBar = () => {
    return (
        <div className={styles.SideBar}>
            <h2 className={styles.SideBarHeader}>Menu</h2>
            <div className={styles.linkGroup}>
                <NavItem path="/" text="/Venues"/>
                <NavItem path="/new-bookings" text="/New Bookings"/>
            </div>
        </div>
    )
}

export default SideBar
