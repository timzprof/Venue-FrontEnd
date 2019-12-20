import React, { Fragment } from 'react'
import styles from './eventShelf.module.css'
import EventItem from '../UI/eventItem/eventItem'
import Loader from '../UI/loader/loader'
import {useSelector} from 'react-redux'
import EmptyList from '../UI/emptyList/emptyList'

const EventShelf = ({filtered}) => {
    const bookingState = useSelector( state => state.bookings )
    const [arr, timesArray] = filtered

    const times = timesArray.map((timeBlock) => {
        let color = '' 

        if (timeBlock.occupied){
            color = "#d4d4d4"
        }else{ 
            color = '#083a55'
        }

        return (
            (<span className={styles.time} style={{color: color}}>
                {timeBlock.timeText}
            </span>)
        )

    })


    const events = arr.map(event => <EventItem timeBlock={{start: event[1].start, end: event[1].end}} blocked={event[0] === "Blocked" ? true : false} name={event[0]}/>)

    return (
        <div className={styles.EventShelf}>
            <p className={styles.littleHeading}>Approved Events</p>
            <div className={styles.innerDiv}> 
                <div className={styles.timeGroup}>
                    {times}
                </div>
                <div className={styles.eventContianer}>
                    <div className={styles.eventContainerInner}>
                        {bookingState.selectedBookingsLoader ? <Loader color='#083a55'/> : (arr.length > 0) ? events : 
                         <EmptyList label="events"/>
                        } 
                        {/* lim for eventName is 40 characters
                        <EventItem timeBlock={{start: 8, end: 13}} eventName="Isaac's Birthdday"/>
                        <EventItem timeBlock={{start: 13, end: 14}} eventName="asdfasdfasdfsd fsde sdwd asdfasdfasdfsd"/>
                        <EventItem timeBlock={{start: 14, end: 18}} eventName="Twitter TownHall meeting......................................................................................................................................"/>
                        <EventItem timeBlock={{start: 18, end: 20}} blocked eventName="Twitter TownHall meeting"/> */}
                    </div>
                </div>
             </div>
             <p className={styles.warning}>Select a date on the calender to see events</p>
            
        </div>
    )
}

export default EventShelf
