import React from 'react'
import styles from './pageLayout.module.css'
import Header from '../UI/header/header'
import Sidebar from '../navigation/sideBar'

const PageLayout = () => {
    return (
        <div className={styles.PageLayout}>
            <Header/>
            <Sidebar/>
            <div className={styles.Main}>
                
            </div>
        </div>
    )
}

export default PageLayout
