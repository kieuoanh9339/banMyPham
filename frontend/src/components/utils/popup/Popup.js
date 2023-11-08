import React, { useState } from "react";
import Input from "../input/Input";

function PopupResetPass() {
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();

  return (
    <div className="pop-up popup-reset-password">
      <div className="p-pop-up" style={{ width: "560px" }}>
        <div class="popup-main">
          <div
            class="popup-title"
            style={{ fontWeight: "bold", fontSize: "140%" }}
          >
            Reset password
          </div>
          <div className="p-popup-input">
            <Input type="password" label="password" onChange={(e) => setPassword1(e.target.value)} />
            <Input type="password" label="password again" onChange={(e) => setPassword2(e.target.value)} />
          </div>
        </div>
        <div class="popup-footer">
          <button
            class="btn btn-cancel"
            id="btnCancelPopup"
            style={{ marginRight: "16px" }}
            
          >
            Cancel
          </button>
          <button
            class="btn"
            style={{ color: "white", backgroundColor: "#254b8e" }}
            // onClick={handleClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupResetPass;