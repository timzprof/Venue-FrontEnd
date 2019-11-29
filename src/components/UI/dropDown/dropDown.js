import React, {useState, useEffect} from 'react'
import styles from './dropDown.module.css'
import { ReactComponent as DropImage } from '../../../assets/images/Polygon 10.svg'

const DropDown = ({label, valueDate, options, onChange, name}) => {
    const [value, setValue] = useState(valueDate)
    const [show, setShow] = useState(true)

    let dropClass = []
    if(show){
        dropClass = [styles.dropDownContainer, styles.dropDownOpen]
    }else{
        dropClass = [styles.dropDownContainer]
    }
    
    useEffect(() => {
        setValue(valueDate)
    }, [valueDate])
    
    const changeValue = (e) => {
        setValue(e.target.textContent)
        onChange(name, e.target.textContent)
    }

    const MenuOptions = options.map(option => <div onClick={(e) => changeValue(e) } className={styles.option}>{option}</div>) 

    return (
        <div className={dropClass.join(' ')}>
            <span> {label} </span>
            <div onMouseOver={() => setShow(true)} className={styles.dropDown}>
                <span>{value}</span>
                <DropImage/>
                <div onClick={() => setShow(false)} className={styles.optionsHolder}>
                    {MenuOptions}
                </div>
            </div>
        </div>
    ) 

}

export default DropDown
