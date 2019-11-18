import React from 'react'
import styles from './viewBookings.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import {NavLink} from 'react-router-dom'
import Booking from '../../components/UI/booking/booking'


const ViewBookings = () => {
    return (
        <PageLayout>
            <div className={styles.subHeader}>
                        <NavLink to="/" className={styles.backLink}>Back</NavLink>
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
    )
}

export default ViewBookings
