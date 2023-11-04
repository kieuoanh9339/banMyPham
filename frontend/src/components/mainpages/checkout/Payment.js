import React, { useState } from "react";
import "./Payment.css"

import Input from "../../utils/input/Input";
function Payment() {
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
                                value={"Ngo Oanh"}
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
                                value={"0868799856"}
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
                                value={"Tran Phu Ha Dong"}
                            />
                        </div>
                    </div>
                </div>
                <div className="payment-method">
                    <h4 className="payment-title">Payment method</h4>
                    <form className="payment-method-body">
                        <div className="cash">
                            <input className="btn-radio" type="radio" id="option1" name="options" value="option1" autoFocus={true} />
                            <label for="option1">Cash</label>
                        </div>
                        <div className="payment-with-bank">
                            <input className="btn-radio" type="radio" id="option1" name="options" value="option1" />
                            <label for="option1">Payment via ATM-Domestic bank account</label>
                        </div>
                        <div className="total-price-ship">
                            <h4>Total order</h4>
                            <div className="cart-subtotal">
                                <div className='label-subtotal'><p>Subtotal:</p></div>
                                <div className='subTotal'><p>$35.0</p></div>
                            </div>
                            <div className="cart-shipping">
                                <div className='label-subtotal'><p>Shipping:</p></div>
                                <div className='subTotal'><p>$0</p></div>
                            </div>
                            <div className="cart-est-total">
                                <div className='label-subtotal'><p>EST.TOTAL:</p></div>
                                <div className='subTotal'><p>$35.0</p></div>
                            </div>
                        </div>

                        <div className="payment-btn-checkout">
                            <button className='btnCheckout-detail'>
                                CHECKOUT
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Payment
