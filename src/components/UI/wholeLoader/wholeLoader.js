import React from 'react'
import styles from './wholeLoader.module.css'
import Loader from '../../UI/loader/loader'

const WholeLoader = () => {
    return (
        <div className={styles.WholeLoader}>
                <Loader color="#083a55"/>
        </div>
    )
}

export default WholeLoader
