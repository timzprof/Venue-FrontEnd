import React from 'react'
import styles from './label.module.css'
import { ReactComponent as PendingImage } from '../../../assets/images/Group 24.svg'
import { ReactComponent as SuccessImage } from '../../../assets/images/Group 25.svg'
import { ReactComponent as FailureImage } from '../../../assets/images/Group 26.svg'


const Label = ({ status }) => {
    let image = ''
    const style = {color: "", backgroundColor:""}
    let text = ''

    if(status == "pending"){
        text = "Pending"
        style.color = "#B39229"
        style.backgroundColor = "#FFEFB9"
        image = <PendingImage/>
    }else if (status == "approved"){
        text = "Approved"
        style.color = "#5F8465"
        style.backgroundColor = "#B9FFC5" 
        image = <SuccessImage/>
    }else {
        text = "Rejected"
        style.color = "#DF7676"
        style.backgroundColor = "#FFE2E2"
        image = <FailureImage/>
    }

    return (
        <div className={styles.Label} style={style}>
            <span className={styles.text}>{text}</span>
            {image}
        </div>
    )
}

export default Label
