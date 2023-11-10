import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './OrderItem.css'
import Anh1 from "../../header/icons/paulaTim.jpg"
import { useState } from "react";
import axios from "../../../API/AxiosConfig"
function OrderItem({ cartItem, isCart, setSl }) {
    console.log(cartItem)
    const inventory = cartItem?.product?.inventory
    const [quantity, setQuantity] = useState(cartItem?.amount)
    const [checkIncrease, setCheckIncrease] = useState(quantity === inventory ? true : false)
    const [checkDecrease, setCheckDecrease] = useState(quantity === 1 ? true : false)
    const [checkDelete, setCheckDelete] = useState(true)
    const [item, setItem] = useState({})
    const cart = {
        "product": cartItem?.product?._id,
        "quantity": quantity
    }

    const deleteCart = {
        "product": cartItem?.product?._id
    }
    const token = localStorage.getItem("token")


    useEffect((quantity) => {
        const patchCart = async () => {

            let check = 0
            const res = await axios.patch("/carts", { ...cart }, {
                headers: { Authorization: token }
            })
            if (res.status == 400) {
                alert(res.data.msg)
            }

            setItem(res.cart)
            setSl(res.cart?.totalPrice)
            localStorage.setItem("amount", item?.amount)
            localStorage.setItem("totalPrice", item?.totalPrice)
        }
        patchCart()
    }, [quantity])

    const handleClickInCrease = () => {
        if (quantity === 1) setCheckDecrease(true)
        const tmp = quantity + 1;
        if (tmp >= 1) setCheckDecrease(false)
        if (tmp == inventory) {
            setCheckIncrease(true)
        }
        setQuantity(tmp);
    }

    const handleClickDecrease = () => {
        const tmp = quantity - 1;
        if (tmp <= inventory) setCheckIncrease(false)
        if (tmp <= 1) {
            setCheckDecrease(true)
        }
        setQuantity(tmp);

    };

    return (
        <div className="cart-item">
            <div
                y
                style={{ textDecoration: "none" }}
            >
                <img src={Anh1} className="cart-item-img" />
            </div>
            <div className='cart-item-infor'>
                <div className="cart-item-selected">
                    <p className="cart-item-des">{cartItem?.product?.product_name}</p>
                    <p className="cart-item-size">
                        {cartItem?.product?.category}
                    </p>
                </div>
                <div className='cart-item-select'>
                    <div className="cart-item-price">
                        <p> <i style={{ marginRight: "5px" }}>x</i> 11</p>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default OrderItem




