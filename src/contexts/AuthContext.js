import React, {createContext, useState} from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, setAuthState] = useState()
    const setToken = (Token) => {
        localStorage.setItem("Token", JSON.stringify(Token))
        setAuthState(true)
    }
    return (
        <AuthContext.Provider value={[authState, setToken]}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider
