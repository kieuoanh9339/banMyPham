import React from "react";
import "./Popup.css";
import axios from "../../../API/AxiosConfig";
import { useNavigate } from "react-router-dom";

function PopupConfirm(props) {
  const { setIsConfirm, orderId, isAdmin,setCallback,callback } = props;
  const navigate = useNavigate()
  const checkClose = () => {
    setIsConfirm(false)
  }
  const checkConfirm = async () => {
    if (!isAdmin) {
      const res = await axios.put(`/orders/${orderId}`, { status: "111" })
      console.log(res)
    } else {
      const res = await axios.put(`/orders/${orderId}`, { status: "11" })
      console.log(res)
    }
    setIsConfirm(false)
    setCallback(!callback)
   
  }
  return (
    <div
      className="pop-up" style={setIsConfirm ? { display: "block" } : { display: "none" }}
    >
      <div className="p-pop-up">
        <div class="popup-main">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div class="popup-title" style={{ fontWeight: "bold" }}>
              Confirm Order
            </div>
          </div>
          <div class="popup-content">
            <p id="textPopup">
              Are you sure want to confirm this order?
            </p>
          </div>
        </div>
        <div class="popup-footer">
          <div className='cancel' >
            <p onClick={checkConfirm}>Confirm</p>
          </div>

          <div className='success' >
            <p onClick={checkClose}>Close</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupConfirm;
