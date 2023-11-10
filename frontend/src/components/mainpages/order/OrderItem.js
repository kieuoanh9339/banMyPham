import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './OrderItem.css'
import Anh1 from "../../header/icons/paulaTim.jpg"
import { useState } from "react";
import axios from "../../../API/AxiosConfig"
function OrderItem({ order }) {
    const [status, setStatus] = useState("")
    const { items } = order.cart
    const [price, setPrice] = useState(0)
    const [cartItem, setCartItem] = useState([])

    // Chuyển đổi ngày tạo thành đối tượng Date
    const createdDate = new Date(order.createdAt);

    // Format ngày tháng theo dạng "DD/MM/YYYY"
    const formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;


    useEffect(() => {
        if (order.status === "00") {
            setStatus("Chờ xử lý")
        } else if (order.status === "10" || order.status === "01") {
            setStatus("Đã huỷ")
        } else {
            setStatus("Chờ nhận hàng")
        }

        const getOrderItem = async (e) => {
            try {
                const res = await axios.get(`/carts/${order.cart._id}`)
                console.log(res)
                setPrice(res.cart.totalPrice)
                setCartItem(res.cart.items)
                console.log(cartItem)
            } catch (e) {
                alert(e.message)
            }
        }
        getOrderItem()
    }, [])



    return (
        <div className='my-order-element'>
            <div className='date-status'>
                <div className='date-ordered'>
                    <div className='label-date-order'><p>DATE:</p></div>
                    <div className='pricce-total-order'><p>{formattedDate}</p></div>
                </div>
                <div className='status-order'>
                    <p>{status}</p>
                </div>
            </div>
            <div className='list-item-product-order'>
                {cartItem.map(item => {
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
                                        <p> ${item.product.price} <i style={{ marginRight: "5px" }}>x</i> {item.amount}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                })}



            </div>
            <div className='total-status'>
                <div className="total-order">
                    <div className='label-total-order'><p>TOTAL:</p></div>
                    <div className='pricce-total-order'><p>${price}</p></div>
                </div>
            </div>


        </div>
    )
}


export default OrderItem




