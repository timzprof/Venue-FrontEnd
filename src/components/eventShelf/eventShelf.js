import React from 'react'
import styles from './eventShelf.module.css'
import EventItem from '../UI/eventItem/eventItem'

const EventShelf = () => {

    const timeShedule = [
        {
            time: 8,
            timeText: '8am',
            occupied: true
        },
        {
            time: 9,
            timeText: '9am',
            occupied: true
        },
        {
            time: 10,
            timeText: '10am',
            occupied: true
        },
        {
            time: 11,
            timeText: '11am',
            occupied: true
        },
        {
            time: 12,
            timeText: '12pm',
            occupied: true
        },
        {
            time: 13,
            timeText: '1pm',
            occupied: false
        },
        {
            time: 14,
            timeText: '2pm',
            occupied: false
        },
        {
            time: 15,
            timeText: '3pm',
            occupied: true
        },
        {
            time: 16,
            timeText: '4pm',
            occupied: true
        },
        {
            time: 17,
            timeText: '5pm',
            occupied: true
        },
        {
            time: 18,
            timeText: '6pm',
            occupied: true
        },
        {
            time: 19,
            timeText: '7pm',
            occupied: true
        },
        {
            time: 20,
            timeText: '8pm',
            occupied: true
        }
    ]


    const times = timeShedule.map((timeBlock) => {
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
    return (
        <div className={styles.EventShelf}>
            <p className={styles.littleHeading}>Events</p>
            <div className={styles.innerDiv}> 
                <div className={styles.timeGroup}>
                    {times}
                </div>
                <div className={styles.eventContianer}>
                    <div className={styles.eventContainerInner}>
                        {/* lim for eventName is 40 characters */}
                        <EventItem timeBlock={{start: 8, end: 13}} eventName="Isaac's Birthdday"/>
                        <EventItem timeBlock={{start: 13, end: 14}} eventName="asdfasdfasdfsd fsde sdwd asdfasdfasdfsd"/>
                        <EventItem timeBlock={{start: 14, end: 18}} eventName="Twitter TownHall meeting......................................................................................................................................"/>
                        <EventItem timeBlock={{start: 18, end: 20}} blocked eventName="Twitter TownHall meeting"/>
                    </div>
                </div>
             </div>
             <p className={styles.warning}>Select a date on the calender to see events</p>
            
        </div>
    )
}

export default EventShelf
