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

const createBookingSuccess = (booking) => {
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

export const getBookings = (id) => (dispatch) => {
    dispatch(bookingActionStart())
    FetchHelper(`/api/v1/booking?venueId=${id}`, "GET", true)
    .then((res) => res.json())
    .then((data) => {
        console.log("data gotten back from asking for bookings", data)
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
    })
    .catch(err => dispatch(bookingActionFail({
        type: "createBookings",
        message: "There was an error creating the booking"
    })))
}

export const approveBooking = (id) => (dispatch) => {
    dispatch(bookingActionStart())
    FetchHelper(`/api/v1/booking/${id}/approve`)
    .then((res) => res.json())
    .then((body) => {
        dispatch(approveBookingSuccess(body.booking))
    })
    .catch(error => dispatch(bookingActionFail({
        type: "approveBookings",
        message: "There was an error approving the booking"
    })))
}


export const rejectBooking = (id) => (dispatch) => {
    dispatch(bookingActionStart())
    FetchHelper(`/api/v1/booking/${id}/reject`)
    .then((res) => res.json())
    .then((body) => {
        dispatch(rejectBookingSuccess(body.booking))
    })
    .catch(error => dispatch(bookingActionFail({
        type: "rejectBooking",
        message: "There was an error rejecting the booking"
    })))
}


export const getRequiredBookings = (date) => (dispatch) => {
    console.log("getting required bookings")
    dispatch(bookingActionStart())
    dispatch(getRequiredBookingsSuccess(date))
}