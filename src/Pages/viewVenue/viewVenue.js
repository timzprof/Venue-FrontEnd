import React, {Fragment,useState, useRef, useContext} from 'react'
import styles from './viewVenue.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import {ReactComponent as AvailableImage} from '../../assets/images/Group 19.svg'
import {ReactComponent as UnavailableImage} from '../../assets/images/Group 18.svg'
import { withRouter } from 'react-router-dom'
import Modal from '../../components/UI/modal/modal'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { AuthContext } from '../../contexts/AuthContext'

const ViewVenue = ({history}) => {
    
    const [modal, setModal] = useState(null)
    const [modalMode, setModalMode] = useState(null)
    const [authState] = useContext(AuthContext)
    const fileInputRef = useRef()

    const getFiles = (e) => {
        e.preventDefault();
        fileInputRef.current.click()
    }

    const targetVenue = {}
    
    const datePicker = () => {
        history.push("/date-picker")
    }

    let modalItem = ""

    const reset = () => {
        setModal(false)
        setModalMode(null)
    }
    if(modalMode == "delete"){
        modalItem = (
            <div className={styles.modalItemDelete}>
                    <Close className="close" onClick={reset} />
                    <h2>Are you sure you want to delete this venue?</h2>
                    <span className={styles.warning}>This action cannot be reversed</span>
                    <div className={styles.btnGroup}>
                                <Button onClick={reset} text="Cancel" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#083a55",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }}  />
                                <Button 
                                    text="Delete" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    // border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                    </div>
            </div>
        )
    }else if(modalMode == "edit"){
        modalItem = (
            <div className={styles.modalItemEdit}>
                <Close className="close" onClick={reset} />
                <h2 className={styles.formHeader}>
                    Edit Venue
                </h2>
                <form action="">
                    <div className={styles.formGroup}>
                        <label htmlFor="">Name</label>
                        <input type="text"/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="">Location</label>
                        <input type="text"/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="">Capacity</label>
                        <input type="number" min="50"/>
                    </div>
                    <div className={styles.formGroupCheck}>
                        <input type="checkbox" id="checky1"/>
                        <label htmlFor="checky1"><div className={styles.fakeCheckBox}></div><span>Internet</span></label>
                    </div>
                    <div className={styles.formGroupCheck}>
                        <input type="checkbox" id="checky2"/>
                        <label htmlFor="checky2"><div className={styles.fakeCheckBox}></div><span>Computers</span></label>
                    </div>
                    <Button onClick={(e) => getFiles(e)} text="Add images" style={{
                            backgroundColor: "#083a55",
                            color: "#fff",
                            padding: "12px 45px",
                            margin: "20px 0 20px 0",
                            display: "inline-block",
                            float: "center"
                        }
                        }/>
                    <input className={styles.fileInput} ref={fileInputRef} multiple min="1" max='3' placeholder='Add images' type="file"/>
                    <div className={styles.btnHolderModal}>
                        <Button type="submit" text="Done" style={{
                            backgroundColor: "#23B83C",
                            color: "#fff",
                            padding: "12px 45px",
                            margin: "0 auto",
                            display: "inline-block",
                            float: "center"
                        }
                        }/>
                    </div>
                </form>
            </div>
        )
    }


    return (
        <Fragment>
            <Modal open={modal} setOpen={setModal}>
                {modalItem}
            </Modal>
            <PageLayout>
            <div className={styles.ViewVenue}>
                    <div className={styles.subHeader}>
                        <NavLink to="/" className={styles.backLink}>Back</NavLink>
                            {authState ? <div className={styles.btnGroup}>
                                <Button 
                                    onClick={() => {
                                        setModal(true)
                                        setModalMode("edit")
                                    }}
                                    text="Edit Venue" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#23B83C",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }} />
                                <Button onClick={() => {
                                            setModal(true)
                                            setModalMode("delete")}} 
                                    text="Delete Venue" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent", 
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                            </div> : null}
                    </div>    
                    <h2 className={styles.venueHeader}>
                        {/* {targetVenue.name} */}
                        Conference Hall

                    </h2>
                    <div className={styles.mainContent}>
                        <div className={styles.mainImage}>
                            <img src={targetVenue.mainImage}/>
                            <div className={styles.smallScreenImages}>
                                <img />
                                <img />
                                <img />
                            </div>
                        </div>
                        <div className={styles.rightSection}>
                            <div className={styles.subImage}>
                                <img src={targetVenue.subImage}/>
                            </div>
                            <div className={styles.tag}><span className={styles.bolden}>CITS</span></div>
                            <div className={styles.tag}><span className={styles.bolden}>200 </span> seats </div>
                            <div className={styles.tag}> <AvailableImage/>  <span className={styles.bolden}>Internet</span></div>
                            <div className={styles.tag}> <UnavailableImage/> <span className={styles.bolden}>Computers</span></div>
                        </div>
                    </div>
                    <div className={styles.btnHolder}>
                        <Button text={authState ? "Manage Bookings" : "Book"} style={{
                            color: "#fff",
                            backgroundColor: "#083a55",
                            margin: "0 auto",
                            marginTop: "15px"
                        }} onClick={datePicker}/>
                    </div>
                </div>
        </PageLayout>
        </Fragment>
    )
}

export default withRouter(ViewVenue)
