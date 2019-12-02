import React from 'react'
import './calendar.css'
import Calendar from 'react-calendar/dist/entry.nostyle'

const CalendarComponent = ({onChange, value, disabledDates}) => {

    console.log("disabled dates", disabledDates)
   const disabled = (date) => {
       let shouldDisable = false
       disabledDates.forEach(day => {
        if (date.date === new Date(day)){
            console.log("found a disabled date")
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


