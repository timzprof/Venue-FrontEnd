import React from 'react'
import styles from './tag.module.css'

const Tag = ({ message }) => {
    return (
        <span className={styles.Tag}>
            { message }
        </span>
    )
}

export default Tag
