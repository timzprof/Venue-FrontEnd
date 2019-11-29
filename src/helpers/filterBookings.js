const times = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"]
const timesArr = [
    {
        time: 8,
        timeText: '8am',
        occupied: false
    },
    {
        time: 9,
        timeText: '9am',
        occupied: false
    },
    {
        time: 10,
        timeText: '10am',
        occupied: false
    },
    {
        time: 11,
        timeText: '11am',
        occupied: false
    },
    {
        time: 12,
        timeText: '12pm',
        occupied: false
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
        occupied: false
    },
    {
        time: 16,
        timeText: '4pm',
        occupied: false
    },
    {
        time: 17,
        timeText: '5pm',
        occupied: false
    },
    {
        time: 18,
        timeText: '6pm',
        occupied: false
    },
    {
        time: 19,
        timeText: '7pm',
        occupied: false
    },
    {
        time: 20,
        timeText: '8pm',
        occupied: false
    }
]

export const filterBooking = (bookingArray) => {
    
    timesArr.forEach((time) => {
        time.occupied = false
    })

    const eventItems = bookingArray.filter(booking => {
        if (booking.status === "approved" || booking.eventTitle === "Blocked"){
          return booking
        }      
    }).map(booking => {
        const time = [ booking.eventTitle, {start: times.indexOf(booking.timeframe[0]) + 8, end: times.indexOf(booking.timeframe[1]) + 8}]
        for (let i = times.indexOf(booking.timeframe[0]); i <= times.indexOf(booking.timeframe[1]); i++){
            timesArr[i].occupied = true
        }
        return time
    })
    return [eventItems, timesArr]
}

export const translate = (time) => timesArr[time-8].timeText


export default timesArr