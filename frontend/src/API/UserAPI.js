import { useState, useEffect } from "react"
import axios from "../API/AxiosConfig"
import { set } from "mongoose"

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })
                    res.role === "1" ? setIsAdmin(true) : setIsAdmin(false)
                    setIsLogged(true)
                    if (res.data.msg === "Phiên đã hết hạn") {
                        alert(res.data.msg)
                        window.location.href = ("/login")
                        localStorage.clear()
                    }

                } catch (err) {
                    // console.log(err.response)
                    // alert(err)
                }
            }
            getUser()
        }
    }, [token])

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin]
    }
}

export default UserAPI




