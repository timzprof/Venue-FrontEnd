import * as actions from './actionsIndex'
import FetchHelper from '../helpers/fetchHelper'

const bookingActionStart = () => {
    return ({
        type: actions.bookingActionStart
    })
}

const bookingActionFail = (error) => {
    return ({
        type: actions.bookingActionFail,
        payload: error
    })
}

const getBookingsSuccess = (bookings) => {
    return ({
        type: actions.getBookingsSuccess,
        payload: bookings
    })
}

export const createBookingSuccess = (booking) => {
    return ({
        type: actions.createBookingSuccess,
        payload: booking
    })
}

const approveBookingSuccess = (id) => {
    return ({
        type: actions.approveBookingSuccess,
        payload: id
    })
}


const rejectBookingSuccess = (id) => {
    return ({
        type: actions.rejectBookingSuccess,
        payload: id
    })
}

const getRequiredBookingsSuccess = (date) => {
    return ({
        type: actions.getRequiredBookingsSuccess,
        payload: date
    })
}

const bookingsActionSuccess = (message) => {
    return ({
        type: actions.bookingsActionSuccess,
        payload: message
    })
}

const getAllBookingsSuccess = (data) => {
    return ({
        type: actions.getAllBookingsSuccess,
        payload: data
    })
} 


export const getBookings = (id) => (dispatch) => {
    dispatch(bookingActionStart())
    FetchHelper(`/api/v1/booking?venueId=${id}`, "GET", true)
    .then((res) => res.json())
    .then((data) => {
        if(data.status === "success"){
            dispatch(getBookingsSuccess(data.data))
            dispatch(getRequiredBookingsSuccess(new Date().toLocaleDateString("en", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })))
        }
    })
    .catch(err => dispatch(bookingActionFail({
        type: "getBookings",
        message: "There was an error getting the bookings"
    })))
}

export const createBooking = (body) => (dispatch) => {
    dispatch(bookingActionStart())
    FetchHelper('/api/v1/booking', "POST", body, true)
    .then((res) => res.json())
    .then((data) => {
        dispatch(createBookingSuccess(data.data))
        dispatch(bookingsActionSuccess("Booking created successfully. Approval status details will be sent to you"))
    })
    .catch(err => dispatch(bookingActionFail({
        type: "createBookings",
        message: "There was an error creating the booking"
    })))
}

export const approveBooking = (body) => (dispatch) => {
    dispatch(bookingActionStart())
    FetchHelper(`/api/v1/booking/approve`, 'PATCH', body, true)
    .then((res) => res.json())
    .then((body) => {
        dispatch(approveBookingSuccess(body.data))
    })
    .catch(error => dispatch(bookingActionFail({
        type: "approveBookings",
        message: "There was an error approving the booking"
    })))
}


export const rejectBooking = (body) => (dispatch) => {
    dispatch(bookingActionStart())
    FetchHelper(`/api/v1/booking/reject`,'PATCH', body, true)
    .then((res) => res.json())
    .then((body) => {
        dispatch(rejectBookingSuccess(body.data))
    })
    .catch(error => dispatch(bookingActionFail({
        type: "rejectBooking",
        message: "There was an error rejecting the booking"
    })))
}


export const getRequiredBookings = (date) => (dispatch) => {
    dispatch(bookingActionStart())
    dispatch(getRequiredBookingsSuccess(date))
}

export const clearBookingNotification = () => {
    return ({
        type: actions.clearBookingNotification        
    })
}


export const  getAllBookings = () => (dispatch) => {
    dispatch(bookingActionStart())
    FetchHelper(`/api/v1/booking/all`, "GET", null, true)
    .then((res) => res.json())
    .then((data) => {
        dispatch(getRequiredBookingsSuccess(data))
    })
    .catch((error) => {
        dispatch(bookingActionFail({
            type: "get all bookings",
            message: "There was an error getting bookings"
        }))
    })
}
