
import React, { createContext, useState, useEffect } from 'react'
import ProductAPI from './API/ProductAPI'
import UserAPI from './API/UserAPI'
import axios from 'axios'
// import axios from './API/AxiosConfig'
export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    // setToken(localStorage.getItem("refreshtoken"))
    // console.log(localStorage.getItem("refreshtoken"))
    // const refreshToken = async () => {
    //     const res = await axios.get('api/user/refresh_token')
    //     console.log(res)
    // }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')

        if(firstLogin){
            setToken(localStorage.getItem("token"))
        }
        

    }, [])

    const state = {

        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI:UserAPI(token)
    }
    console.log(state)
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )

}