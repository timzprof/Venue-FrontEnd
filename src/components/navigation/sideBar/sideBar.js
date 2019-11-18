import React from 'react'
import styles from './sideBar.module.css'
import NavItem from  '../navItem/navItem'

const SideBar = ({ open, setOpen }) => {
    let sideBarClasses = [styles.SideBar]
    let backdropClasses = [styles.backdrop]
    if(open){
        sideBarClasses = [styles.SideBar, styles.open]
        backdropClasses = [styles.backdrop, styles.backdropOpen]
    }else{
        sideBarClasses = [styles.SideBar]
        backdropClasses = [styles.backdrop]
    }
    return (
        <React.Fragment>
         <div onClick={() => setOpen(false)} className={backdropClasses.join(' ')}></div>   
        <div className={sideBarClasses.join(' ')}>
            <h2 className={styles.SideBarHeader}>Menu</h2>
            <div className={styles.LinkGroup}>
                <NavItem path="/" exact text="Venues"/>
                <NavItem path="/new-bookings"  exact text="New Bookings"/>
            </div>
        </div>
        </React.Fragment>
    ) 
}

export default SideBar
