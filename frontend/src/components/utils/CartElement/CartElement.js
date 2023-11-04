import React, { useContext } from "react";
import "./CartElement.css";
import { GlobalState } from "../../../GlobalState";
import CartShoppingItem from "../cartShoppingItem/CartShoppingItem";
import CartAPI from '../../../API/CartAPI'
function CartElement({setSl}) {
  // const state = useContext(GlobalState)
  const cartAPI=CartAPI(localStorage.getItem("token"))
  const [cartItems] = cartAPI.cartItem
  const [cart] = cartAPI.cart

  return (
    <div className="cart-items">
      <div className="cart-item-list">
        {
          cartItems.map(cartItem => {
            return <CartShoppingItem key={cartItem._id} cartItem={cartItem} isCart={cart.status==="active"? true : false } isPatch={false} setSl={setSl}/>
          })
        }
      </div>
    </div>
  );
}

export default CartElement;
