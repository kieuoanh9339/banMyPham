import React, { useEffect, useContext, useState } from 'react'
import OrderItem from './OrderItem'
import { GlobalState } from "../../../GlobalState"
import axios from '../../../API/AxiosConfig'
import "./MyOrder.css"
function MyOrder() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [user, setUser]=state.userAPI.user
    const [orderByC, setOrderByC] = useState([])
    
    useEffect(() => {
        const getOrders = async () => {
            if (isAdmin === false) {
                const res = await axios.get(`orders/getOrder`)
                console.log(res.data)
                setOrderByC(res.data)
            } else {
                const res = await axios.get(`/orders`)
                console.log(res)
                setOrderByC(res.data)
            }
        }
        getOrders()
    }, [])

    return (
        <div className='my-order'>
            {
                orderByC?.reverse()?.map(order => {
                    return <>
                       <OrderItem order ={order}  isAdmin={isAdmin} />
                    </>
                })
            }

           

        </div>
    )
}


export default MyOrder




