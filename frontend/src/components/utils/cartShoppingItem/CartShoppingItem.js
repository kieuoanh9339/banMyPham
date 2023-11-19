import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './CartShoppingItem.css'
import Anh1 from "../../header/icons/paulaTim.jpg"
import { useState } from "react";
import axios from "../../../API/AxiosConfig"
function CartShoppingItem({ cartItem, isCart,setSl }) {
    console.log(cartItem)
    const inventory = cartItem?.product?.inventory
    const [quantity, setQuantity] = useState(cartItem?.amount)
    const [checkIncrease, setCheckIncrease] = useState(quantity === inventory ? true : false)
    const [checkDecrease, setCheckDecrease] = useState(quantity === 1 ? true : false)
    const [checkDelete, setCheckDelete] = useState(true)
    const [item,setItem]=useState({})
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
            localStorage.setItem("amount",item?.amount)
            localStorage.setItem("totalPrice",item?.totalPrice)
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
    const deleteitem = async (quantity) => {
        let check=0
        const deleteCart = {
            "product": cartItem?.product?._id
        }
        const res = await axios.delete(`/carts/${cartItem?.product?._id}`)
        console.log(res)
        if(res.status === 'success' ){

            window.location.href = "/cart"
            alert("xoa thanh cong")
        }
        if (res.status === 400) {
            alert(res.data.msg)
            check=1
        }


    }
    const onClickDelete = () => {
        deleteitem(0)
    }

    
    return (
        <div className="cart-item">
            <button class="delete-button" onClick={onClickDelete}>Xóa</button>
            
                <Link
                    to={`/product/detail/`}
                    style={{ textDecoration: "none" }}
                >
                    <img src={cartItem?.product?.images.url} className="cart-item-img" />
                </Link>
            
            <div className='cart-item-infor'>
                <div className="cart-item-selected">
                    <p className="cart-item-des">{cartItem?.product?.product_name}</p>
                    <p className="cart-item-size">
                        {cartItem?.product?.category}
                    </p>
                </div>
                <div className='cart-item-select'>
                    <div className="cart-item-price">
                        <p style={{ marginRight: "10px" }}>${cartItem?.product?.price}</p>
                        
                    </div>
                    {isCart && (
                        <div className="cart-option">
                            <div className="cart-quantity">
                                <button
                                    className="cart-input-select cart-input-sub"
                                    onClick={handleClickDecrease} disabled={checkDecrease}
                                >
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input
                                    type="text"
                                    className="cart-input-display"
                                    value={quantity}
                                />
                                <button
                                    className="cart-input-select cart-input-add"
                                    onClick={handleClickInCrease} disabled={checkIncrease}
                                >
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>


                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}


export default CartShoppingItem




