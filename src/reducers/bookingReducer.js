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
    allBookings: [],
    bookings: [
        // all bookings for all venues  they have a venue id, and a time array
    ],
    selectedBookings: [],
    success: {
        status: false,
        successMessage: ''
    }
}


const bookingReducer = (state = initialStore, action) => {
    switch(action.type){
        case(actions.bookingActionStart):
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                    type: '',
                    message: '',
                },
                // success: {
                //     status: false,
                //     successMessage: ''
                // }
            }
        case(actions.bookingActionFail):
            return {
                ...state,
                loading: false,
                error : {
                    status: true,
                    type: action.payload.type,
                    message: action.payload.message
                },
                success: {
                    status: false,
                    successMessage: ''
                }
        }
        case(actions.bookingsActionSuccess):
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    type: '',
                    message: '',
                },
                success: {
                    status: true,
                    successMessage: action.payload
                }
            }
        case(actions.clearBookingNotification):
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    type: '',
                    message: '',
                },
                success: {
                    status: false,
                    successMessage: ''
                }
            }
        case(actions.createBookingSuccess):
            return {
                ...state,
                bookings: state.bookings.concat(action.payload),
                loading: false

            }
        case(actions.getAllBookingsSuccess):
            return {
                ...state,
                allBookings: [...action.payload],
                loading: false,
                error: {
                    status: false,
                    type: '',
                    message: '',
                },
                success: {
                    status: false,
                    successMessage: ''
                }
            }    
        case(actions.getBookingsSuccess):
            return {
                ...state,
                bookings: action.payload,
                loading: false
            }
        case(actions.getRequiredBookingsSuccess):
            return {
                ...state,
                selectedBookings: state.bookings.filter(booking => booking.date === action.payload),
                loading: false,
                error: {
                    status: false,
                    type: '',
                    message: '',
                },
                success: {
                    status: false,
                    successMessage: ''
                }
            }    
        case(actions.approveBookingSuccess):
            return {
                ...state,
                bookings: state.bookings.map(booking => {
                    if (booking.id == action.payload.id){
                        return {
                            ...booking,
                            status: 'approved'
                        }
                    }
                    return booking
                }),
                loading: false,
                selectedBookings: state.selectedBookings.map(booking => {
                    if (booking.id == action.payload.id){
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
                    if (booking.id == action.payload.id){
                        return {
                            ...booking,
                            status: 'reject'
                        }
                    }
                    return booking
                }),
                loading: false,
                selectedBookings: state.selectedBookings.map(booking => {
                    if (booking.id == action.payload.id){
                        return {
                            ...booking,
                            status: 'reject'
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