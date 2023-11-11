import React, { useEffect, useContext, useState } from 'react'
import OrderItem from './OrderItem'
import { GlobalState } from "../../../GlobalState"
import axios from '../../../API/AxiosConfig'
import "./MyOrder.css"
function MyOrder() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
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
            }
        }
        getOrders()
    }, [])

    return (
        <div className='my-order'>
            {
                orderByC?.reverse()?.map(order => {
                    return <>
                       <OrderItem order ={order}/>
                    </>
                })
            }

           

        </div>
    )
}


export default MyOrder




