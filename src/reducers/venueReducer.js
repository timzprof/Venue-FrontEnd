import * as actions from '../actions/actionsIndex'



const initialStore = {
    loading: true,
    venues: [{
        id: 6,
        title: "Location 5",
        address: "Location 5",
        capacity: 1300,
        featureImage: "https://res.cloudinary.com/alphex-code-ltd/image/upload/v1574977438/sirfcob6sb6arozn5vyc.jpg",
        otherImages: [],
        timeAllowed:  ["8am", "8pm"],
        createdAt: "2019-11-28T21:43:59.252Z",
        updatedAt: "2019-11-28T21:43:59.252Z",
        adminId: 1,
        resources:  [{
            id: 34,
            name: "internet",
            value: "true",
            venueId: 6,
            createdAt: "2019-11-28T21:43:59.270Z",
            updatedAt: "2019-11-28T21:43:59.270Z"
        }]
    }, {
        id: 6,
        title: "Location 5",
        address: "Location 5",
        capacity: 1300,
        featureImage: "https://res.cloudinary.com/alphex-code-ltd/image/upload/v1574977438/sirfcob6sb6arozn5vyc.jpg",
        otherImages: [],
        timeAllowed:  ["8am", "8pm"],
        createdAt: "2019-11-28T21:43:59.252Z",
        updatedAt: "2019-11-28T21:43:59.252Z",
        adminId: 1,
        resources:  [{
            id: 34,
            name: "internet",
            value: "true",
            venueId: 6,
            createdAt: "2019-11-28T21:43:59.270Z",
            updatedAt: "2019-11-28T21:43:59.270Z"
        }]
    }, {
        id: 6,
        title: "Location 5",
        address: "Location 5",
        capacity: 1300,
        featureImage: "https://res.cloudinary.com/alphex-code-ltd/image/upload/v1574977438/sirfcob6sb6arozn5vyc.jpg",
        otherImages: [],
        timeAllowed:  ["8am", "8pm"],
        createdAt: "2019-11-28T21:43:59.252Z",
        updatedAt: "2019-11-28T21:43:59.252Z",
        adminId: 1,
        resources:  [{
            id: 34,
            name: "internet",
            value: "true",
            venueId: 6,
            createdAt: "2019-11-28T21:43:59.270Z",
            updatedAt: "2019-11-28T21:43:59.270Z"
        }]
    }, {
        id: 6,
        title: "Location 5",
        address: "Location 5",
        capacity: 1300,
        featureImage: "https://res.cloudinary.com/alphex-code-ltd/image/upload/v1574977438/sirfcob6sb6arozn5vyc.jpg",
        otherImages: [],
        timeAllowed:  ["8am", "8pm"],
        createdAt: "2019-11-28T21:43:59.252Z",
        updatedAt: "2019-11-28T21:43:59.252Z",
        adminId: 1,
        resources:  [{
            id: 34,
            name: "internet",
            value: "true",
            venueId: 6,
            createdAt: "2019-11-28T21:43:59.270Z",
            updatedAt: "2019-11-28T21:43:59.270Z"
        }]
    }, {
        id: 6,
        title: "Location 5",
        address: "Location 5",
        capacity: 1300,
        featureImage: "https://res.cloudinary.com/alphex-code-ltd/image/upload/v1574977438/sirfcob6sb6arozn5vyc.jpg",
        otherImages: [],
        timeAllowed:  ["8am", "8pm"],
        createdAt: "2019-11-28T21:43:59.252Z",
        updatedAt: "2019-11-28T21:43:59.252Z",
        adminId: 1,
        resources:  [{
            id: 34,
            name: "internet",
            value: "true",
            venueId: 6,
            createdAt: "2019-11-28T21:43:59.270Z",
            updatedAt: "2019-11-28T21:43:59.270Z"
        }]
    }],
    targetVenue: {
        id: 6,
        title: "Location 5",
        address: "Location 5",
        capacity: 1300,
        featureImage: "https://res.cloudinary.com/alphex-code-ltd/image/upload/v1574977438/sirfcob6sb6arozn5vyc.jpg",
        otherImages: [],
        timeAllowed:  ["8am", "8pm"],
        createdAt: "2019-11-28T21:43:59.252Z",
        updatedAt: "2019-11-28T21:43:59.252Z",
        adminId: 1,
        resources:  [{
            id: 34,
            name: "internet",
            value: "true",
            venueId: 6,
            createdAt: "2019-11-28T21:43:59.270Z",
            updatedAt: "2019-11-28T21:43:59.270Z"
        }]
    },
    error: {
        status: false,
        errorType: '',
        errorMessage: '', 
    },
    success: {
        status: false,
        successMessage: ''
    } 
}

const venueReducer = (state = initialStore, action) => {
    switch(action.type){
        case(actions.venueActionStart):
            return {
                ...state,
                loading: true,
                message: '',
                error: {
                    status: false,
                    errorType: '',
                    errorMessage: ''
                },
                success: {
                    status: false,
                    successMessage: ''
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
                },
                success: {
                    status: false,
                    successMessage: ''
                }
                // consider setting error message in the store
            }
        case(actions.venueActionSuccess):
            return {
                ...state,
                success: {
                    status: true,
                    successMessage: action.payload
                },
                loading: false,
            }
        case(actions.clearVenueNotification):
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
        case(actions.getVenuesSuccess):
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