import React, {useRef, useState}  from 'react'
import styles from './input.module.css'
import Button from '../UI/button/button'

const Input = ({type, value,  inputObj, changeFunc, errorMessages}) => {

    const fileInputRef = useRef()
    const getFiles = (e) => {
        e.preventDefault();
        fileInputRef.current.click()
    }

    const parentFunc = (e) => {
        changeFunc(e)
    }

    let input = ''
    switch(type){
        case("input"):
            input = (
                        <div className={styles.formGroup}>
                            <label>{inputObj.label} </label>
                            <input value={value} {...inputObj} onChange={(e) => parentFunc(e)}/>
                            { (errorMessages.length > 0) ? <p className={styles.error}> {errorMessages[0]} </p> : null}
                        </div>
            )
            return input
        case("textarea"):
            input = (
                <div className={styles.formGroup}>
                    <label htmlFor="">  {inputObj.label} </label>
                    <textarea value={value}></textarea>
                    { ( errorMessages.length > 0) ? <p className={styles.error}> {errorMessages[0]} </p> : null}
                </div>
            )
            return input
        case("file"):
            input = (
                <React.Fragment>
                    <Button onClick={(e) => getFiles(e)} text={inputObj.label} style={{
                            backgroundColor: "#083a55",
                            color: "#fff",
                            padding: "12px 45px",
                            margin: "20px 0 0 0",
                            display: "inline-block",
                            float: "center"
                        }
                        }/>
                    <input value={value} className={styles.fileInput} onChange={(e) => parentFunc(e)} ref={fileInputRef} {...inputObj}/> 
                    { (errorMessages.length > 0) ? <p className={styles.error}> {errorMessages[0]} </p> : null}
                </React.Fragment>
            )
            return input
        case("checkbox"):
            input = (
                <div className={styles.formGroupCheck}>
                        <input value={value} {...inputObj} onChange={(e) => parentFunc(e)}/>
                        <label htmlFor={inputObj.id}><div className={styles.fakeCheckBox}></div><span>{inputObj.label}</span></label>
                        { (errorMessages && errorMessages.length > 0) ? <p className={styles.error}> {errorMessages[0]} </p> : null}  
                </div>
            )
            return input
        default:
            input =  null
            return input
    }

    return (
        <React.Fragment>
            {input}
        </React.Fragment>
    )
}

export default Input
