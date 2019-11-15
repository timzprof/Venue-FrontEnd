import React, {useState, useEffect, useRef} from 'react'
import styles from './modal.module.css'

const Modal = ({ open, setOpen, children}) => {


    const backdropRefContainer = useRef()
    const containerRefContainer = useRef()
    const modalRefContainer = useRef()

    const closeModal = (e) => {
        if(e.target === e.currentTarget){
            setOpen(false)
        }
    }



    let modalClasses = [styles.Modal]
    let backdropClasses = []
    let containerClasses = []

    if(open){
        modalClasses = [styles.Modal, styles.ModalOpen]
        backdropClasses = [styles.backdrop]
        containerClasses = [styles.MainContainer]        
    }else if (open === false){
        modalClasses = [styles.Modal, styles.ModalOpen]
        backdropClasses = [styles.backdrop, styles.backdropClose]
        containerClasses = [styles.MainContainer, styles.MainContainerClose]
    }


    useEffect(() => {
        const timey = setTimeout(() => {
            backdropRefContainer.current.classList.remove(styles.backdropClose)
            containerRefContainer.current.classList.remove(styles.MainContainerClose)
            modalRefContainer.current.classList.remove(styles.ModalOpen)
            setOpen(null)
        }, 300)
        return(() => {
            clearTimeout(timey)
        })
    }, [(open == false)])



    return (
        <div ref={modalRefContainer} className={modalClasses.join(' ')}>
            <div onClick={(e) => closeModal(e)} className={backdropClasses.join(' ')} ref={backdropRefContainer}>
            </div>
            <div ref={containerRefContainer} className={containerClasses.join(' ')}>
                    {children}
            </div>
        </div>
    )
}

export default Modal
