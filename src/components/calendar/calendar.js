import React from 'react'
import './calendar.css'
import Calendar from 'react-calendar/dist/entry.nostyle'

const CalendarComponent = ({onChange, value}) => {

    
    return (
        <Calendar value={new Date(value)} onChange={onChange} calendarType="US" activeStartDate={new Date()} className="Calendar"/>
    )
}



export default CalendarComponent


