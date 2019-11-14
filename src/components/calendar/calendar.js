import React from 'react'
import './calendar.css'
import Calendar from 'react-calendar/dist/entry.nostyle'

const CalendarComponent = ({disabledDates}) => {

    const checkdisabled = (date) => {
        for (let i in disabledDates){
            console.log(disabledDates[i].toLocaleDateString())
            console.log(new Date(date.date).toLocaleDateString())
            if(new Date(date.date).toLocaleDateString() == disabledDates[i].toLocaleDateString()){
                console.log("bingo")
                return true 
            }
        } 
    }
    return (
        <Calendar tileDisabled={(date) => checkdisabled(date) } calendarType="US" activeStartDate={new Date()} className="Calendar" value={new Date()}/>
    )
}



export default CalendarComponent


