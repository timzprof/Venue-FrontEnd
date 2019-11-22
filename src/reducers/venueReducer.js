import * as actions from '../actions/actionsIndex'


const initialStore = {
    loading: false,
    venues: [],
    targetVenue: 0,
    error: {
        status: true,
        errorType: '',
        errorMessage: '',
    }
}

const venueReducer = (state = initialStore, action) => {
    switch(action.type){
        case(actions.venueActionStart):
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                    errorType: '',
                    errorMessage: ''
                }
            }
        case(actions.venueActionFail):
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    errorType: action.payload.type,
                    errorMessage: action.payload.message
                }
                // consider setting error message in the store
            }
        case(actions.getVenuesSuccess):
            return {
                ...state,
                venues: action.payload
            }
        case(actions.getVenueSuccess):
            return {
                ...state,
                venues: state.venues.concat(action.payload)
            }
        case(actions.deleteVenueSuccess):
            return {
                ...state,
                venues: state.venues.filter(venue => venue.id != action.payload.id)
            }
        case(actions.editVenueSuccess):
            return{
                ...state,
                venues: state.venues.map(venue => {
                    if(venue.id == action.payload.id){
                        return action.payload
                    }else{
                        return venue
                    }
                })
            }                
        default:
            return state
    }
}


export default venueReducer