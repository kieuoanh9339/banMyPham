import React, { useEffect, useContext, useState } from 'react'
import OrderItem from './OrderItem'
import { GlobalState } from "../../../GlobalState"
import axios from '../../../API/AxiosConfig'
import "./MyOrder.css"
function MyOrder() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [user, setUser] = state.userAPI.user
    const [orderByC, setOrderByC] = useState([])
    const [process, setProcess] = useState(true)

    useEffect(() => {
        const getOrders = async () => {
            if (isAdmin === false) {
                const res = await axios.get(`orders/getOrder`)
                console.log(res.data)
                setOrderByC(res.data)
            } else {
                console.log(process)
                if (process) {
                    const res = await axios.get(`/orders?status=00`)
                    console.log(res)
                    setOrderByC(res.data)
                } else {
                    const res = await axios.get(`/orders?status=01,10,11,111`)
                    console.log(res)
                    setOrderByC(res.data)
                }
            }
        }
        getOrders()
    }, [process])
    console.log(orderByC.reverse());
    return (
        <div className='parent-order' style={{ display: "flex", justifyContent: "space-around" }}>
            {
                isAdmin && <div className='menu-order' style={{ marginTop: "20px", display: "block", justifyContent: "left", }}>
                <div className='menu-process-order' style={{ margin: "10px", cursor: "pointer",color: process ? 'red' :'black'}} onClick={() => setProcess(true)}>
                    Xử lý đơn hàng
                </div>
                <div className='menu-list-order' style={{ margin: "10px", cursor: "pointer",color: process===false ? 'red' :'black' }} onClick={() => setProcess(false)}>
                    Danh sách đơn hàng
                </div>
            </div>
            }
            <div className='my-order'>
                {
                    
                    orderByC?.reverse()?.map(order => {
                        
                        return <>
                            <OrderItem order={order} isAdmin={isAdmin} process={process} />
                        </>
                    })
                }



            </div>
        </div>
    )
}


export default MyOrder




