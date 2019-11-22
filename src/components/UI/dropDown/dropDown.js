import React, {useState} from 'react'
import styles from './dropDown.module.css'
import { ReactComponent as DropImage } from '../../../assets/images/Polygon 10.svg'

const DropDown = ({label, options, onChange}) => {

    const [value, setValue] = useState('')
    const changeValue = (e) => {
        setValue(e.target.textContent)
        // onChange(e.target.textContent)
    }

    const MenuOptions = options.map(option => <div onClick={(e) => changeValue(e) } className={styles.option}>{option}</div>) 

    return (
        <div className={styles.dropDownContainer}>
            <span> {label} </span>
            <div className={styles.dropDown}>
                <span>{value}</span>
                <DropImage/>
                <div className={styles.optionsHolder}>
                    {MenuOptions}
                </div>
            </div>
        </div>
    ) 

}

export default DropDown
