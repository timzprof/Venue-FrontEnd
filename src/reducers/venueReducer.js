import * as actions from '../actions/actionsIndex'



const initialStore = {
    loading: true,
    venues: [],
    targetVenue: null,
    error: {
        status: false,
        errorType: '',
        errorMessage: '', 
    },
    message: ""
}

const venueReducer = (state = initialStore, action) => {
    switch(action.type){
        case(actions.venueActionStart):
            console.log("action has started")
            return {
                ...state,
                loading: true,
                message: '',
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
        case(actions.venueActionSuccess):
            console.log(action.payload)
            console.log("action delete success", action.payload)
            return {
                ...state,
                message: action.payload,
                loading: false,
            }    
        case(actions.getVenuesSuccess):
            console.log('action payload', action.payload)
            return {
                ...state,
                venues: action.payload,
                loading: false
            }    
        case(actions.setTargetVenueSuccess):
            if(action.payload.id){
                let requiredVenue = state.venue.filter(venue => venue.id === action.payload.id )
                return {
                    ...state,
                    targetVenue: requiredVenue[0],
                    loading: false
                }
            }else{
                return {
                    ...state,
                    targetVenue: action.payload.venue,
                    loading: false
                }
            }    
        case(actions.getVenueSuccess):
            return {
                ...state,
                venues: state.venues.concat(action.payload),
                targetVenue: action.payload,
                loading: false
            }
        case(actions.deleteVenueSuccess):
            return {
                ...state,
                venues: state.venues.filter(venue => venue.id !== action.payload),
                loading: false
            }
        case(actions.createVenueSuccess):{
            return {
                ...state,
                venues: state.venues.concat(action.payload),
                loading: false
            }
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
                loading: false,
                targetVenue: action.payload
            }                
        default:
            return state
    }
}



export default venueReducer