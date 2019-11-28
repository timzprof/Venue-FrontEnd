import * as actions from '../actions/actionsIndex'
const options = {
    day: "numeric",
    month: "long",
    year: "numeric"

}

const initialStore = {
    loading: true,
    error: {
        status: false,
        type: '',
        message: ''
    },
    bookings: [
        // all bookings for all venues  they have a venue id, and a time array
    ],
    selectedBookings: [],
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
                bookings: state.bookings.concat(action.payload),
                loading: false

            }
        case(actions.getBookingsSuccess):
            return {
                ...state,
                bookings: action.payload,
                loading: false
            }
        case(actions.getRequiredBookingsSuccess):
            console.log("payload", action.payload)
            return {
                ...state,
                selectedBookings: state.bookings.filter(booking => booking.date === action.payload),
                loading: false
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
                }),
                loading: false        
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
                }),
                loading: false
            }
        default:
            return state
    }
}


export default bookingReducer