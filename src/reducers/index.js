import {combineReducers} from 'redux'
import venueReducer from './venueReducer'
import bookingReducer from './bookingReducer'

const centralReducer = combineReducers({
    venues: venueReducer,
    bookings: bookingReducer
})


export default centralReducer