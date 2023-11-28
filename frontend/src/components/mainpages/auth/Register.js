import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './Login.css'
import axios from "../../../API/AxiosConfig"
import Input from "../../utils/input/Input"
function Register() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        fullname: "",
        phonenumber: "",
        address: ""
    })

    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")
    const [fullname, setFullName] = useState("")
    const [phoneNumber, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const onChangeInput = (name, value) => {
        setUser({ ...user, [name]: value })// sao chép tất cả thuộc tính của đối tượng user hiện có va update thuoc tinh name = value
    }

    const onClickSubmit = async (e) => {
        const res = await axios.post("/user/register", { ...user })
        if (res.status === 400) {
            setEmail(res.data.email)
            setPw(res.data.password)
            setFullName(res.data.fullname)
            setPhone(res.data.phoneNumber)
            setAddress(res.data.address)
            console.log(localStorage.getItem('firstLogin'))
        } else {
            localStorage.setItem("firstLogin", true)
            localStorage.setItem("token",res)
            window.location.href = "/"
        }
        console.log(res)

    }
    return (
        <div>
            <div className='login-form'>
                <div className='login-email-err'>
                    <Input autofocus
                        type="text"
                        require={true}
                        label="Email"
                        value={user.email}
                        onChange={(e) => onChangeInput("email", e.target.value)}
                    />
                    <div className='error-email'><p>{email}</p></div>
                </div>
                <div className='login-email-err'>
                    <Input
                        type="text"
                        require={true}
                        label="Họ và tên"
                        value={user.fullname}
                        onChange={(e) => onChangeInput("fullname", e.target.value)}
                    />
                    <div className='error-email'><p>{fullname}</p></div>
                </div>
                <div className='login-email-err'>
                    <Input
                        type="text"
                        require={true}
                        label="Số điện thoại"
                        value={user.phonenumber}
                        onChange={(e) => onChangeInput("phonenumber", e.target.value)}
                    />
                    <div className='error-email'><p>{phoneNumber}</p></div>
                </div>
                
                <div className='login-email-err'>
                    <Input
                        type="text"
                        require={true}
                        label="Địa chỉ"
                        value={user.address}
                        onChange={(e) => onChangeInput("address", e.target.value)}
                    />
                    <div className='error-email'><p>{address}</p></div>
                </div>
                
                <div className='login-email-err'>
                    <Input
                        type="password"
                        require={true}
                        label="Mật khẩu"
                        value={user.password}
                        onChange={(e) => onChangeInput("password", e.target.value)}
                    />
                    <div className='error-email'><p>{pw}</p></div>
                </div>
                <div className='acc-re'>
                    <div><p>Tôi đã có tài khoản? </p></div>
                    <div><Link to="/login" >Đăng nhập</Link></div>
                </div>
                <button className='btnLogin' onClick={(e) => onClickSubmit(e)}>
                    Đăng ký
                </button>
            </div>
        </div>
    )
}


export default Register




