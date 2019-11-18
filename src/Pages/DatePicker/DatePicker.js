import React from 'react'
import styles from './DatePicker.module.css'
import CalendarComponent from '../../components/calendar/calendar'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import EventShelf from '../../components/eventShelf/eventShelf'
import { withRouter } from 'react-router-dom'


const DatePicker = ({ history }) => {
    return (
        <div>
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
                    <Button onClick={() => {
                        history.push("/bookings")
                    }} text="View Bookings" style={{
                        color: '#fff',
                        backgroundColor: '#083a55',
                        marginTop: '20px'
                    }} />
            </PageLayout>
        </div>
    )
}

export default withRouter(DatePicker) 
