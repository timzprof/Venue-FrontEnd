import React from 'react'
import styles from './button.module.css'

const Button = ({action, text, image:Image, ...rest}) => {
    return (
        <div className={styles.Button} onClick={action} {...rest} >
            <div className={styles.inner}>
                {Image ? <Image/> : null}
                <span>{text}</span>
            </div>
        </div>
    )
}

export default Button
