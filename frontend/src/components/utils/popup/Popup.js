import React from "react";
import "./Popup.css";
import axios from "../../../API/AxiosConfig";
import { useNavigate } from "react-router-dom";

function Popup(props) {
  const { setIsCancel, orderId, isAdmin,setCallback,callback } = props;
  const navigate = useNavigate()
  const checkClose = () => {
    setIsCancel(false)
  }
  const checkCancel = async () => {
    if (!isAdmin) {
      const res = await axios.put(`/orders/${orderId}`, { status: "10" })
      console.log(res)
    } else {
      const res = await axios.put(`/orders/${orderId}`, { status: "01" })
      console.log(res)
    }
    setIsCancel(false)
    setCallback(!callback)
   
  }
  return (
    <div
      className="pop-up" style={setIsCancel ? { display: "block" } : { display: "none" }}
    >
      <div className="p-pop-up">
        <div class="popup-main">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div class="popup-title" style={{ fontWeight: "bold" }}>
              Cancel Order
            </div>
          </div>
          <div class="popup-content">
            <p id="textPopup">
             Bạn có chắc chắn huỷ đơn hàng này không?
            </p>
          </div>
        </div>
        <div class="popup-footer">
          <div className='cancel' >
            <p onClick={checkCancel}>Xác nhận</p>
          </div>

          <div className='success' >
            <p onClick={checkClose}>Đóng</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
