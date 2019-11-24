import React, {useState} from 'react'
import styles from './button.module.css'
import Loader from '../loader/loader'

const Button = ({action, loading, type, text, image:Image, ...rest}) => {
   
    // const [loading, setLoading] = useState()
    let btnDisabled = false
    let content = (<React.Fragment>
        {Image ? <Image/> : null}
        <span>{text}</span>
    </React.Fragment>)

    const btnAction = (e) => {
        action(e)
        // setLoading(true)
    }

    if(loading == true && type == "submit"){
        btnDisabled = true
        content = <div className={styles.loaderContainer}> <Loader color="#fff"/> </div>
    }


    return (
        <button className={styles.Button} disabled={btnDisabled} onClick={(e)=> btnAction(e)} {...rest} >
            <div className={styles.inner}>
                {content}
            </div>
        </button>
    )
}

export default Button
