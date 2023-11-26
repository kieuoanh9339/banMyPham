
import React, { createContext, useState, useEffect } from 'react'
import ProductAPI from './API/ProductAPI'
import UserAPI from './API/UserAPI'
import CategoryAPI from './API/CategoryAPI'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')

        if(firstLogin){
            setToken(localStorage.getItem("token"))
        }
        

    }, [])

    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI:UserAPI(token),
        categoryAPI: CategoryAPI()
    }
    console.log(state)
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )

}