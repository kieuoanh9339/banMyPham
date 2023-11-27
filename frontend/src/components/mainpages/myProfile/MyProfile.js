import React, { useState, useContext } from "react";
import "./MyProfile.css";
import Input from "../../utils/input/Input";
import { GlobalState } from "../../../GlobalState";

import axios from "../../../API/AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
function MyProfile() {
    const state= useContext(GlobalState)
    const [user, setUser]= state.userAPI.user
    const navigate= useNavigate()
    const [check, setCheck]=useState(false)
    const onChangeInput = (name, value) => {
        setUser({ ...user, [name]: value })// sao chép tất cả thuộc tính của đối tượng user hiện có va update thuoc tinh name = value
    }


    const onClickSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.put("user/updateUser", { ...user })
        alert(res.message)
        navigate("/")
    }   

   

    return (
        <div className="profile">
            <div className="profile-header">
               <p>Quản lý thông tin </p>
            </div>
            <div className="inf-password">
                <div className="profile-information">
                    <Input
                        label="email"
                        type="text"
                        value={user.email}
                        disabled={true}
                    />
                    <Input
                        label="fullname"
                        type="text"
                        value={user.fullname}
                        onChange={(e) => onChangeInput("fullname", e.target.value)}
                    />
                    <Input
                        label="phone number"
                        type="text"
                        value={user.phonenumber}
                        onChange={(e) => onChangeInput("phonenumber", e.target.value)}
                    />
                    <Input
                        label="Address"
                        type="text"
                        value={user.address}
                        onChange={(e) => onChangeInput("address", e.target.value)}
                    />
                    <div className="forget-password"  >
                        Thay đổi mật khẩu
                    </div>
                </div>

            </div>

            <div className="style-btsave">
            <button className='btnSave' onClick={(e) => onClickSubmit(e)}>
                Lưu
            </button>
            </div>
        </div>
    );
}

export default MyProfile;