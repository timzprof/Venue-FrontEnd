import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'

const GuardRoutes = ({path, component:Component, ...rest}) => {
    const venueState = useSelector(state => state.venues)
   
    let available = false

    if (venueState.targetVenue){
        available = true
    }

    return (
        <Route path={path} component={() => available ? <Component/> : <Redirect to="/page-not-found"/>} />
    )
}

export default GuardRoutes
