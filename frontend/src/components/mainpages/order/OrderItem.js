import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './OrderItem.css'
import Anh1 from "../../header/icons/paulaTim.jpg"
import { useState } from "react";
import axios from "../../../API/AxiosConfig"
import Popup from '../../utils/popup/Popup';
import PopupConfirm from '../../utils/popup/PopupConfirm';
function OrderItem({ order, isAdmin }) {
    console.log(order);
    const [displayStatus, setDisplayStatus] = useState("")
    const [status, setStatus] = useState(order.status)
    const [callback, setCallback] = useState(false)

    useEffect(()=>{
        setStatus(order.status)
        if (order.status === "00") {
            setDisplayStatus("Chờ xử lý")
        } else if (order.status === "10") {
            setDisplayStatus("Đã huỷ")
        } else if (order.status === "01") {
            setDisplayStatus("Đơn hàng đã bị huỷ")
        } else if (order.status === "11") {
            setDisplayStatus("Chờ nhận hàng")
        }else if (order.status === "111") {
            setDisplayStatus("Giao hàng thành công")
        }
    })

    // Chuyển đổi ngày tạo thành đối tượng Date
    const createdDate = new Date(order.createdAt);

    // Format ngày tháng theo dạng "DD/MM/YYYY"
    const formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;

    const [isCancel, setIsCancel] = useState()
    const [isConfirm, setIsConfirm] = useState()
    useEffect(() => {
        const getOrderItem = async (e) => {
            try {
                const res = await axios.get(`/orders/${order._id}`)
                order.status = res.data?.status
                setStatus(res.data?.status)

            } catch (e) {
                alert(e.message)
            }
        }
        getOrderItem()

    }, [callback])

    

    const handelClick = () => {
        setIsCancel(true)
    }

    const handelClickConfirm = () => {
        setIsConfirm(true)
    }

    return (
        <div className='my-order-element'>
            {isConfirm && <PopupConfirm setIsConfirm={setIsConfirm} orderId={order._id} isAdmin={isAdmin} setCallback={setCallback} callback={callback} />}
            {isCancel && <Popup setIsCancel={setIsCancel} orderId={order._id} isAdmin={isAdmin} setCallback={setCallback} callback={callback} />}
            <div className='date-status'>
                <div className='date-ordered'>
                    <div className='label-date-order'><p>Ngày:</p></div>
                    <div className='pricce-total-order'><p>{formattedDate}</p></div>
                </div>
                <div className='status-order'>
                    <p>{displayStatus}</p>
                </div>
            </div>
            {isAdmin && <div className='infor-user-order'>
                <div className='order_user-name' style={{ padding: "12px 24px", display: "flex" }}>
                    <p style={{ fontWeight: "bold", paddingRight: "10px" }}>Tên: </p><p>{order?.user?.fullname}</p>
                </div>
                <div className='order_user-address' style={{ padding: "12px 24px", display: "flex" }}>
                    <p style={{ fontWeight: "bold", paddingRight: "10px" }}>Địa chỉ: </p><p>{order?.user?.address}</p>
                </div>
                <div className='order_user-phone' style={{ padding: "12px 24px", display: "flex" }}>
                    <p style={{ fontWeight: "bold", paddingRight: "10px" }}>Số điện thoại: </p><p>{order?.user?.phonenumber}</p>
                </div>
            </div>}
            <div className='list-item-product-order'>
                {order?.cart?.items?.map(item => {
                    return <>
                        <div className="cart-item">
                            <div
                                y
                                style={{ textDecoration: "none" }}
                            >
                                <img src={item.product.images.url} className="cart-item-img" />
                            </div>
                            <div className='cart-item-infor'>
                                <div className="cart-item-selected">
                                    <p className="cart-item-des">{item.product.product_name}</p>
                                    <p className="cart-item-size">
                                        {item.product.category}
                                    </p>
                                </div>
                                <div className='cart-item-select'>
                                    <div className="cart-item-price">
                                        <p> ${item.boughtProductPrice} <i style={{ marginRight: "5px" }}>x</i> {item.amount}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                })}



            </div>
            <div className='total-status'>
                <div>
                    <div className="total-order">
                        <div className='label-total-order'><p>Tổng:</p></div>
                        <div className='pricce-total-order'><p>${order?.cart?.totalPrice}</p></div>

                    </div>

                </div>
                <div className='change-status'>
                    {
                        (status === "10" || status === "01" || status === "111") ? <></>
                            : <div className='btn-cancel-success'>
                                {
                                    status === "00" ?
                                        <>
                                            <div className='cancel' >
                                                <p onClick={handelClick}>Huỷ đơn</p>
                                            </div>
                                            <div className='success' onClick={handelClickConfirm}>
                                                {isAdmin ? <p >Xác nhận</p> : <p>Đã nhận</p>}
                                            </div>
                                        </> 
                                        : <>
                                        <div className='success' onClick={handelClickConfirm}>
                                                {!isAdmin && <p>Đã nhận</p>}
                                            </div>
                                        </>
                                }


                            </div>
                    }

                </div>
            </div>
            <div className='process-order' style={{ fontSize: "14px", color: "GrayText" }}>
                <i>Note: {order?.process === '0' ? "Đơn hàng thanh toán tiền mặt" : "Đơn hàng đã thanh toán"}</i>
            </div>

        </div>
    )
}


export default OrderItem




