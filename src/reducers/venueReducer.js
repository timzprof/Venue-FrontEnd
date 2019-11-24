import * as actions from '../actions/actionsIndex'



const initialStore = {
    loading: true,
    venues: [],
    targetVenue: {},
    error: {
        status: false,
        errorType: '',
        errorMessage: '',
    }
}

const venueReducer = (state = initialStore, action) => {
    switch(action.type){
        case(actions.venueActionStart):
            console.log("action has started")
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
            console.log('action payload', action.payload)
            return {
                ...state,
                venues: action.payload,
                loading: false
            }
        case(actions.setTargetVenueSuccess):
            return {
                ...state,
                targetVenue: action.payload,
                loading: false
            }    
        case(actions.getVenueSuccess):
            return {
                ...state,
                venues: state.venues.concat(action.payload),
                loading: false
            }
        case(actions.deleteVenueSuccess):
            return {
                ...state,
                venues: state.venues.filter(venue => venue.id != action.payload.id),
                loading: false
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
                }),
                loading: false
            }                
        default:
            return state
    }
}



export default venueReducer