import React, {useContext} from 'react'
import styles from './sideBar.module.css'
import NavItem from  '../navItem/navItem'
import { AuthContext } from '../../../contexts/AuthContext'

const SideBar = ({ open, setOpen }) => {
    let sideBarClasses = [styles.SideBar]
    let backdropClasses = [styles.backdrop]
    const [authState] = useContext(AuthContext)
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
                <NavItem exact path="/"  text="Venues"/>
                {authState ? <NavItem path="/new-bookings/"  exact text="New Bookings"/> : null}
            </div>
        </div>
        </React.Fragment>
    ) 
}

export default SideBar
