import React, {useContext} from 'react'
import { Route , Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'


const ProtectedRoutes = ({ path, component:Component, ...rest }) => {
    
    const [authState] = useContext(AuthContext)
    console.log(authState)

    return (
        <Route path={path} component={() =>  authState ? <Component/> : <Redirect to="/login"/>} {...rest}/>
    )
}

export default ProtectedRoutes
