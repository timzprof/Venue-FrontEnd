import React, { useState, useContext } from 'react'
import styles from './DatePicker.module.css'
import CalendarComponent from '../../components/calendar/calendar'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import EventShelf from '../../components/eventShelf/eventShelf'
import { withRouter } from 'react-router-dom'
import Modal from '../../components/UI/modal/modal'
import DropDown from '../../components/UI/dropDown/dropDown'
import { AuthContext } from '../../contexts/AuthContext'

const DatePicker = ({ history }) => {
    const [modalOpen, setModalOpen] = useState()
    const [authState] = useContext(AuthContext)
    return (
        <React.Fragment>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className={styles.bookVenue}>
                    <form action="">
                        <div className={styles.bookVenueContainer}>
                        <div className={styles.otherdetails}>
                            <h2 className={styles.formHeader}>
                                Booking Details
                            </h2>
                            <div className={styles.formGroup}>
                                <label htmlFor="">Event title</label>
                                <input type="text"/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="">Description</label>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <h2 className={styles.formHeader}>
                                Contact Information
                            </h2>
                            <div className={styles.formGroup}>
                                <label htmlFor="">Email</label>
                                <input type="email"/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="">Phone-number</label>
                                <input type="number"/>
                            </div>
                        </div>
                        <div className={styles.bookingDetails}>
                            <h2 className={styles.formHeader}>
                                Booking Period
                            </h2>
                            <DropDown label="July" options={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]}/>
                            <div className={styles.flexContainer}>
                                <DropDown label="from" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"]}/>
                                <DropDown label="to" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"]}/>
                                <Button 
                                 text="Select Time" style={{
                                    color: '#fff',
                                    backgroundColor: '#23B83C',
                                    marginTop: "20px"
                                }} />
                            </div>
                            <div className={styles.timeHolder}>
                                <div className={styles.timeLabel}>
                                    <span>July 10, 1pm - 3pm</span>
                                </div>
                                <div className={styles.timeLabel}>
                                    <span>July 10, 1pm - 3pm</span>
                                </div><div className={styles.timeLabel}>
                                    <span>July 10, 1pm - 3pm</span>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className={styles.btnHolder}>
                            <Button 
                                 text="Submit" style={{
                                    color: '#fff',
                                    backgroundColor: '#23B83C',
                                    marginTop: "20px"
                             }} />
                        </div>
                    </form>
                </div>
            </Modal>
            <PageLayout>
                    <div className={styles.subHeader}>
                        <NavLink to="back" className={styles.backLink}>Back</NavLink>
                    </div>    
                    <h2 className={styles.venueHeader}>
                        {/* {targetVenue.name} */}
                        Conference Hall
                        <span className={styles.Date}>
                            {new Date().toLocaleDateString()}
                        </span>
                    </h2>
                    <div className={styles.mainContent}>
                        <CalendarComponent/>
                        <EventShelf/>
                        {/* Bookings */}  
                    </div>
                    {authState ? <Button onClick={() => {
                        history.push("/bookings")
                    }} text="Manage Bookings" style={{
                        color: '#fff',
                        backgroundColor: '#083a55',
                        marginTop: '20px'
                    }} /> : <Button onClick={() => {
                        setModalOpen(true)
                    }} text="Book" style={{
                        color: '#fff',
                        backgroundColor: '#083a55',
                        marginTop: '20px'
                    }} />}
            </PageLayout>
        </React.Fragment>
    )
}

export default withRouter(DatePicker) 
