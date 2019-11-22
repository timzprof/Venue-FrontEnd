import React, {useState} from 'react'
import styles from './viewBookings.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import {NavLink} from 'react-router-dom'
import Booking from '../../components/UI/booking/booking'
import Modal from '../../components/UI/modal/modal'
import DropDown from '../../components/UI/dropDown/dropDown'
import Button from '../../components/UI/button/button'
import { ReactComponent as Close } from '../../assets/images/close.svg'


const ViewBookings = () => {
    const [modalOpen, setModalOpen] = useState()

    return (
        <React.Fragment>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className={styles.modalItemDelete}>
                    <Close className="close" onClick={() => setModalOpen(false)} />
                    <h2>Are you sure you want to deactivate bookings for this date ?</h2>
                    <span className={styles.warning}>This action cannot be reversed</span>
                    <div className={styles.options}>
                        <div className={styles.flexContainer}>
                                <DropDown label="from" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"]}/>
                                <DropDown label="to" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"]}/>
                        </div>
                        <div className={styles.specialLine}>
                            <hr/>
                            <span>OR</span>
                        </div>
                        <div className={styles.formGroupCheck}>
                        <input type="checkbox" id="checky1"/>
                        <label htmlFor="checky1"><div className={styles.fakeCheckBox}></div><span>All day</span></label>
                    </div>
                    </div>
                    <div className={styles.btnGroup}>
                                <Button onClick={() => setModalOpen(false)} text="Cancel" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#083a55",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }}  />
                                <Button 
                                    text="Delete" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    padding: "12px 30px"
                                }} />
                    </div>
                </div>
            </Modal>
            <PageLayout>
                    <div className={styles.subHeader}>
                        <NavLink to="/" className={styles.backLink}>Back</NavLink>
                        <Button onClick={() => setModalOpen(true)}
                                    text="Disable bookings for this date" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                    </div>
                    <h2 className={styles.venueHeader}>
                        {/* {targetVenue.name} */}
                        Conference Hall
                        <span className={styles.Date}>
                            {new Date().toLocaleDateString()}
                        </span>
                    </h2>
                    <div className={styles.BookingList}>
                        <Booking approved/>
                        <Booking approved/>
                        <Booking approved/>
                    </div>
            </PageLayout>
        </React.Fragment>
    )
}

export default ViewBookings
