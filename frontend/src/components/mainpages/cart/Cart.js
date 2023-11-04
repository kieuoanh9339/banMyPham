import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import imgPayment from "../../header/icons/payment.webp"
import CartElement from '../../utils/CartElement/CartElement';
import { GlobalState } from '../../../GlobalState';
import CartAPI from '../../../API/CartAPI'
import "./Cart.css"
function Cart() {
  const cartAPI=CartAPI(localStorage.getItem("token"))
  const [cart] = cartAPI.cart
  console.log(cart.totalPrice)
  useEffect(()=>{
    
  })
  const [sl, setSl] = useState(cart.totalPrice)
  return (
    <div className='cart-parent'>
      <div className='cart-element'>
        <CartElement setSl={setSl} />
      </div>
      <div className='cart-summary'>
        <div className='tilte-cart-summary'>
          Estimate Tax & Shipping
        </div>
        <div className="cart-subtotal">
          <div className='label-subtotal'><p>Subtotal:</p></div>
          <div className='subTotal'><p>${sl}</p></div>
        </div>
        <div className="cart-shipping">
          <div className='label-subtotal'><p>Shipping:</p></div>
          <div className='subTotal'><p>$0</p></div>
        </div>
        <div className="cart-est-total">
          <div className='label-subtotal'><p>EST.TOTAL:</p></div>
          <div className='subTotal'><p>${sl}</p></div>
        </div>
        <div className='btnCheckout'>
          <Link to="/checkout">
            <button className='btnCheckout-detail'>
              CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Cart




