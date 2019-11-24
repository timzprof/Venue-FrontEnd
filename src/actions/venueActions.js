import * as actions from './actionsIndex'
import FetchHelper from '../helpers/fetchHelper'




const venueActionStart = () => {
    return {
        type: actions.venueActionStart
    }
}

const venueActionFail = (errorObj) => {
    return ({
        type: actions.venueActionFail,
        payload: errorObj
    })
}

const getVenuesSuccess = (venues) => {
    return ({
        type: actions.getVenuesSuccess,
        payload: venues
    })
}

const getVenueSuccess = (venue) => {
    return ({
        type: actions.getVenueSuccess,
        payload: venue
    })
}

const deleteVenueSuccess = (id) => {
    return {
        type: actions.deleteVenueSuccess,
        payload: id
    }
}

const createVenueSuccess = (venue) => {
    return {
        type: actions.createVenueSuccess,
        payload: venue
    }
}

const editVenueSuccess = (newVenue) => {
    return {
        type: actions.editVenueSuccess,
        payload: newVenue
    }
}

const setTargetVenueSuccess = (id) => {
    return {
        type: actions.setTargetVenueSuccess,
        payload: id
    }
}

export const getVenues = () => (dispatch) => {
    console.log("Fetched venues")
    dispatch(venueActionStart())
    FetchHelper('/api/v1/venue', "GET")
    .then((res) => res.json())
    .then((body) => {
        console.log(body)
        dispatch(getVenuesSuccess(body.data))
    })
    .catch(error => dispatch(venueActionFail({
        type: 'getVenues',
        message: 'There was an error fetching venues'
    })))
}

export const setTargetVenue = (id) => (dispatch) => {
    dispatch(setTargetVenueSuccess(id))
}

export const getVenue = (id) => (dispatch) => {
    dispatch(venueActionStart())
    FetchHelper(`/api/v1/venue/${id}`, "GET")
    .then((res) => res.json())
    .then((body) => {
        dispatch(getVenueSuccess(body.venue))
    })
    .catch(error => dispatch(venueActionFail({
        type: 'getVenue',
        message: 'There was an error fetching the Venue '
    })))
}


export const deleteVenue = (id) => (dispatch) => {
    dispatch(venueActionStart())
    FetchHelper(`/api/v1/venue/${id}`, "DELETE", true)
    .then((res) => res.json())
    .then((body) => {
        dispatch(deleteVenueSuccess(body.venue.id))
    })
    .catch(error => dispatch(venueActionFail({
        type: "deleteVenue",
        message: 'There was an error deleting the venue'
    })))
}

export const createVenue = (venueBody) => (dispatch) => {
    dispatch(venueActionStart())
    FetchHelper('/api/v1/venue', "POST", venueBody, true)
    .then((res) => res.json())
    .then((body) => {
        dispatch(createVenueSuccess(body.venue))        
    })
    .catch((error) => dispatch(venueActionFail({
        type: "createVenue",
        message: "An error occurred while creating the venue, please try again"
    })))
}

export const editVenue = (id, newVenueBody) => (dispatch) => {
    dispatch(venueActionStart())
    FetchHelper(`/api/v1/venue/${id}`, "PATCH", newVenueBody, true)
    .then((res) => res.json())
    .then((body) => {
        dispatch(editVenueSuccess(body.venue))
    })
    .catch((error) => dispatch(venueActionFail({
        type: "editVenue",
        message: "An error occurred while editing the venue, please try again"
    })))
}






