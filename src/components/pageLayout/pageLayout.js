import React, {useState} from 'react'
import styles from './pageLayout.module.css'
import Header from '../UI/header/header'
import Sidebar from '../navigation/sideBar/sideBar'
import Notification from '../UI/notification/notification'

const PageLayout = ({children}) => {
    const [menuOpen, setMenuOpen] = useState(null)

    return (
        <div className={styles.PageLayout}>
            <Header open={menuOpen} setOpen={setMenuOpen} />
            <Sidebar open={menuOpen} setOpen={setMenuOpen}/>
            <div className={styles.Main}>
                <Notification/>
                {children}
            </div>
        </div>
    )
}

export default PageLayout
