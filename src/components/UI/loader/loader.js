import React from 'react'
import styles from './loader.module.css'

const Loader = ({ color }) => {
    return (
            <div className={styles.Loader} style={{borderColor: color}}></div>
    )
}

export default Loader
