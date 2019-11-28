import React, {useState, useEffect} from 'react'
import styles from './dropDown.module.css'
import { ReactComponent as DropImage } from '../../../assets/images/Polygon 10.svg'

const DropDown = ({label, valueDate, options, onChange, name}) => {
    console.log("from the dropdown", valueDate)
    const [value, setValue] = useState(valueDate)
    
    useEffect(() => {
        setValue(valueDate)
    }, [valueDate])
    
    const changeValue = (e) => {
        setValue(e.target.textContent)
        onChange(name, e.target.textContent)
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
