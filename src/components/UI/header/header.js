import React, {useState} from 'react'
import styles from './header.module.css'
import { NavLink } from 'react-router-dom'
import { ReactComponent as LogoutImage } from '../../../assets/images/logout.svg'


const Header = ({open, setOpen}) => {
    // const [menuOpen, setMenuOpen] = useState()

    let barClasses = [styles.bar]
    let LogoClasses = [styles.Logo]

    if(open){
        barClasses = [styles.bar, styles.open]
        LogoClasses = [styles.Logo, styles.logoOpen]
    }else if (open === false){
        barClasses = [styles.bar]
        LogoClasses = [styles.Logo]
    }

    return (
        <React.Fragment>
        <div onClick={() => setOpen(!open)} className={styles.menu}>
            <div className={barClasses.join(' ')}></div>
        </div>

        <NavLink className={LogoClasses.join(' ')} to="/">
            <h2>Venues App</h2>
        </NavLink>
        <div className={styles.Header}>
            <NavLink className={styles.flex} to="/login">Login</NavLink>
            {/* <NavLink to="/Logout"> <span className={styles.flex}> <LogoutImage/> Logout </span> </NavLink> */}
        </div>
        </React.Fragment>
    )
}

export default Header
