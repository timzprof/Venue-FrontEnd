import React from 'react'
import styles from './emptyList.module.css'

const EmptyList = ({label}) => {

    return (
        <div className={styles.Empty}>
            <h1>No {label} available</h1>
        </div>
    )
}

export default EmptyList
