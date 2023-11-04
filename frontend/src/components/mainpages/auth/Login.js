import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './Login.css'
// import axios from 'axios';
import axios from "../../../API/AxiosConfig"
import Input from "../../utils/input/Input"
function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""    
    })

    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")

    const onChangeInput = (name, value) => {
        setUser({ ...user, [name]: value })// sao chép tất cả thuộc tính của đối tượng user hiện có va update thuoc tinh name = value
    }

    const onClickSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post("user/login", { ...user })
        if (res.status === 400) {
            setEmail(res.data.email)
            setPw(res.data.password)
            // console.log(localStorage.getItem('firstLogin'))
        } else {
            localStorage.setItem("firstLogin", true)
            window.location.href = "/"
            localStorage.setItem("token",res.accessToken)
        }

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
                        type="password"
                        require={true}
                        label="Password"
                        value={user.password}
                        onChange={(e) => onChangeInput("password", e.target.value)}
                    />
                    <div className='error-email'><p>{pw}</p></div>
                </div>

                <div className='acc-re'>
                    <div><p>Do not have an account? </p></div>
                    <div><Link to="/register" >Sign up</Link></div>
                </div>
                <button className='btnLogin' onClick={(e) => onClickSubmit(e)}>
                    LOGIN
                </button>
            </div>
        </div>
    )
}


export default Login




