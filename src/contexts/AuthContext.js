import React, {createContext, useState} from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    let authIntial = false
    
    if (localStorage.getItem("Token")){
        console.log(localStorage.getItem("Token"))
        authIntial = true
    }

    const [authState, setAuthState] = useState(authIntial)
    const setToken = (Token) => {
        localStorage.setItem("Token", JSON.stringify(Token))
        setAuthState(true)
    }
    const deletetoken = () => {
        localStorage.removeItem("Token")
        setAuthState(false)
    }
    return (
        <AuthContext.Provider value={[authState, setToken, deletetoken]}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider
