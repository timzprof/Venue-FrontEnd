import * as actions from '../actions/actionsIndex'

const initialStore = {
    loading: false,
    error: {
        status: false,
        type: '',
        message: ''
    },
    bookings: [
        // all bookings for all venues  they have a venue id, and a time array
    ]
}


const bookingReducer = (state = initialStore, action) => {
    switch(action.type){
        case(actions.bookingActionStart):
            return {
                ...state,
                loading: true
            }
        case(actions.bookingActionFail):
            return {
                ...state,
                loading: false,
                error : {
                    status: true,
                    type: action.payload.type,
                    message: action.payload.message
                }
        }
        case(actions.createBookingSuccess):
            return {
                ...state,
                bookings: state.bookings.concat(action.payload)

            }
        case(actions.getBookingsSuccess):
            return {
                ...state,
                bookings: action.payload
            }
        case(actions.approveBookingSuccess):
            return {
                ...state,
                bookings: state.bookings.map(booking => {
                    if (booking.id == action.payload){
                        return {
                            ...booking,
                            status: 'approved'
                        }
                    }
                    return booking
                })
            }
        case(actions.rejectBookingSuccess):
            return {
                ...state,
                bookings: state.bookings.map(booking => {
                    if (booking.id == action.payload){
                        return {
                            ...booking,
                            status: 'rejected'
                        }
                    }
                    return booking
                })
            }
        default:
            return state
    }
}


export default bookingReducer