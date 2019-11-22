import * as actions from './actionsIndex'
import FetchHelper from '../helpers/fetchHelper'

const bookingActionStart = () => {
    return ({
        type: actions.bookingActionStart
    })
}

const bookingActionFail = () => {
    return ({
        type: actions.bookingActionFail
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

export const getBookings = () => (dispatch) => {
    dispatch(bookingActionStart)
    FetchHelper('/api/v1/booking', "GET", true)
    .then((res) => res.json())
    .then((data) => {
        dispatch(getBookingsSuccess(data.bookings))
    })
    .catch(err => dispatch(bookingActionFail))
}

export const createBooking = (body) => (dispatch) => {
    dispatch(bookingActionStart)
    FetchHelper('/api/v1/booking', "POST", body, true)
    .then((res) => res.json())
    .then((data) => {
        dispatch(createBookingSuccess(data.booking))
    })
    .catch(err => dispatch(bookingActionFail))
}

export const approveBooking = (id) => (dispatch) => {
    dispatch(bookingActionStart)
    FetchHelper(`/api/v1/booking/${id}/approve`)
    .then((res) => res.json())
    .then((body) => {
        dispatch(approveBookingSuccess(body.booking))
    })
    .catch(error => dispatch(bookingActionFail))
}


export const rejectBooking = (id) => (dispatch) => {
    dispatch(bookingActionStart)
    FetchHelper(`/api/v1/booking/${id}/reject`)
    .then((res) => res.json())
    .then((body) => {
        dispatch(rejectBookingSuccess(body.booking))
    })
    .catch(error => dispatch(bookingActionFail))
}

 