import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const Logout = () => {
    const [authState, setToken, deleteToken] = useContext(AuthContext)
    deleteToken()
     
    return (
        <Redirect to="/"/>
    )
}

export default Logout
