import React from 'react'
import styles from './newBookings.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import Booking from '../../components/UI/booking/booking'

const NewBookings = () => {

    return (
        <PageLayout>
            <div className={styles.subHeader}>
                        <NavLink to="/" className={styles.backLink}>Back</NavLink>
                            <div className={styles.btnGroup}>
                                <Button text="Manage Time" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#23B83C",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }} />
                                <Button text="Disable Booking For This Date" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                            </div>
                    </div>
                    <h2 className={styles.venueHeader}>
                        {/* {targetVenue.name} */}
                        Conference Hall
                        <span className={styles.Date}>
                            {new Date().toLocaleDateString()}
                        </span>
                    </h2>
                    <div className={styles.BookingList}>
                        <Booking/>
                        <Booking/>
                        <Booking/>
                    </div>
        </PageLayout>
    )
}

export default NewBookings
