import React from 'react'
import styles from './sideBar.module.css'
import NavItem from  '../navItem/navItem'

const SideBar = ({ open, setOpen }) => {
    let sideBarClasses = [styles.SideBar]
    if(open){
        sideBarClasses = [styles.SideBar, styles.open]
    }else{
        sideBarClasses = [styles.SideBar]
    }
    return (
        <div className={sideBarClasses.join(' ')}>
            <h2 className={styles.SideBarHeader}>Menu</h2>
            <div className={styles.LinkGroup}>
                <NavItem path="/" exact text="Venues"/>
                <NavItem path="/new-bookings"  exact text="New Bookings"/>
            </div>
        </div>
    )
}

export default SideBar
