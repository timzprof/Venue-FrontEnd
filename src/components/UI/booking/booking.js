import React from 'react'
import styles from './booking.module.css'
import Button from '../button/button'
import Label from '../label/label'
import { useDispatch } from 'react-redux'
import * as actions from '../../../actions/bookingActions'

const Booking = ({ bookingObj }) => {
    const dispatch = useDispatch()
    const approve = (id) => {
        dispatch(actions.approveBooking({
            bookingId: id
        }))
    }

    const reject = (id) => {
        dispatch(actions.rejectBooking({
            bookingId: id 
        }))
    }

    const id = bookingObj.id

    return (
        <div className={styles.Booking}>
           <div className={styles.timeBlock}>
            <span>{bookingObj.timeframe[0]} to {bookingObj.timeframe[1]}</span>
           </div> 
            <div className={styles.bookingInfo}>
                <div className={styles.main}>
                    <h2> {bookingObj.eventTitle} </h2>
                    <Label status={bookingObj.status}/>
                </div>
                <div className={styles.subInfo}>
                    <p> {bookingObj.eventDescription} </p>
                    <span className={styles.detail}> <span className={styles.bold}>Email</span> {bookingObj.contactEmail} </span>
                    <span className={styles.detail}> <span className={styles.bold}>Phone</span> {bookingObj.contactPhone}</span>
                    <div className={styles.btnGroup}>
                        { (bookingObj.status === "approved ") ? (<Button 
                                    text="Reject" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />) :  
                                [<Button 
                                    text="Approve" action={() => approve(id)} style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#23B83C",
                                    marginRight: "20px",
                                    padding: "12px 30px",
                                    marginBottom: "10px"
                                }} />,
                                <Button 
                                    text="Reject" action={() => reject(id)} style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px",
                                    marginBottom: "10px"
                                }} />]}
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Booking
