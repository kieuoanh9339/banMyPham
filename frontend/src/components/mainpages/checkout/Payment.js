import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import CartAPI from "../../../API/CartAPI";
import axios from "../../../API/AxiosConfig";
import "./Payment.css"

function Payment() {
    const url = window.location.href;
    const state = useContext(GlobalState)
    const [user, setUser] = state.userAPI.user
    const cartAPI = CartAPI(localStorage.getItem("token"))
    const [cart, setCart] = cartAPI.cart
    let check = ''
    console.log(cart)
    const payment = {
        userId: user._id,
        cartId: cart._id,
        process: "0"
    }

    const checkProcessCash = () => {
        check = true
        console.log(check)
    }

    const [pay, setPay] = useState({
        language: "en",
        amount: 0,
    });

    pay.amount = cart.totalPrice * 24000



    const createOrder = async (e) => {
        try {
            if (check === true) {
                let checkout = false
                const cartId = localStorage.getItem("cartId")
                const res1 = await axios.get(`/carts/${cartId}/checkout`)
                console.log(res1)
                if (res1.status === 'success') {
                    checkout = true
                }
                if (checkout) {
                    const res = await axios.post("orders", { ...payment })
                    alert(res.msg)
                    window.location.href = "/my-order"
                }
            } else {
                console.log(pay);
                if (!pay.bankCode) {
                    alert("Vui long chon phuong thuc thanh toan")
                } else {
                    payment.process = "1"
                    const res1 = await axios.post("orders", { ...payment })

                    localStorage.setItem("orderId", res1.data._id)
                    pay.orderId = res1.data._id
                    const res2 = await axios.post("/payment/create_payment_url", { ...pay })
                    window.location.href = res2
                    console.log(res2);
                }
            }
        } catch (e) {
            alert(e.message)
        }
    }

    useEffect(() => {
        const getParameterByName = (name) => {
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return "";
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };
        const vnp_ResponCode = getParameterByName("vnp_ResponseCode");
        if (vnp_ResponCode == "00") {
            const createOrder = async () => {
                try {
                    console.log("Success")
                    const cartId = localStorage.getItem("cartId")
                    const res1 = await axios.get(`/carts/${cartId}/checkout`)
                    console.log(res1)
                    window.location.href = ("/my-order")

                } catch (e) {
                    alert(e.message)
                }
            }
            createOrder()
        } else if (vnp_ResponCode == "24") {
            const deleteOrder = async () => {
                const orderId = localStorage.getItem("orderId")
                axios.delete(`/orders/${orderId}`)
            }
            deleteOrder()

            alert("Thanh toan that bai")
        }
    }, [url]);



    const handleChange = (value) => {
        setPay({ ...pay, ["bankCode"]: value });
        check = false

    };
    console.log(pay)
    return (
        <div className="payment">
            <div className="payment-filling">
                <div className="payment-delivery-infor">
                    <h4 className="payment-title">Delivery information</h4>
                    <div className="payment-infor-user">
                        <div className="input">
                            <label
                                className="p-label-checkout"
                                style={{ color: "black" }}
                            >
                                Full name:
                            </label>
                            <br />
                            <input
                                type={"text"}
                                className="p-input"
                                disabled={true}
                                value={user.fullname}
                            />
                        </div>
                        <div className="input">
                            <label
                                className="p-label-checkout"
                                style={{ color: "black" }}
                            >
                                Phone Number:
                            </label>
                            <br />
                            <input
                                type={"text"}
                                className="p-input"
                                disabled={true}
                                value={user.phonenumber}
                            />
                        </div>
                        <div className="input">
                            <label
                                className="p-label-checkout"
                                style={{ color: "black" }}
                            >
                                Address:
                            </label>
                            <br />
                            <input
                                type={"text"}
                                className="p-input"
                                disabled={true}
                                value={user.address}
                            />
                        </div>
                    </div>
                </div>
                <div className="payment-method">
                    <h4 className="payment-title">Payment method</h4>
                    <form className="payment-method-body">
                        <div className="cash">
                            <label>
                                <input
                                    type="radio"
                                    name="cash"
                                    value="cash"
                                    onClick={checkProcessCash}
                                />
                                Cash
                            </label>
                        </div>
                        <div className="payment-with-bank">

                            <label>
                                <input
                                    type="radio"
                                    name="cash"
                                    value="VNBANK"
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                                Payment via ATM-Domestic bank account
                            </label>
                        </div>

                    </form>
                    <div className="total-price-ship">
                        <h4>Total order</h4>
                        <div className="cart-subtotal">
                            <div className='label-subtotal'><p>Subtotal:</p></div>
                            <div className='subTotal'><p>${cart.totalPrice}</p></div>
                        </div>
                        <div className="cart-shipping">
                            <div className='label-subtotal'><p>Shipping:</p></div>
                            <div className='subTotal'><p>$0</p></div>
                        </div>
                        <div className="cart-est-total">
                            <div className='label-subtotal'><p>EST.TOTAL:</p></div>
                            <div className='subTotal'><p>${cart.totalPrice}</p></div>
                        </div>
                    </div>

                    <div className="payment-btn-checkout">
                        <button className='btnCheckout-detail' onClick={(e) => createOrder(e)}>
                            CHECKOUT
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Payment
