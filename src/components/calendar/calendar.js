import React from 'react'
import './calendar.css'
import Calendar from 'react-calendar/dist/entry.nostyle'

const CalendarComponent = ({onChange, value, disabledDates}) => {

   const disabled = (date) => {
       let shouldDisable = false
       disabledDates.forEach(day => {
        if (date.date === new Date(day)){
            shouldDisable = true
        }
       })

       return shouldDisable
   } 
    
    return (
        <Calendar tileDisabled={disabled} value={new Date(value)} onChange={onChange} calendarType="US" activeStartDate={new Date()} className="Calendar"/>
    )
}



export default CalendarComponent


