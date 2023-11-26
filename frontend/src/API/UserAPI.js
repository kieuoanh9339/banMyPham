import { useState, useEffect } from "react"
import axios from "../API/AxiosConfig"

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [user, setUser]=useState({})

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })
                    setUser(res)
                    res.role === "1" ? setIsAdmin(true) : setIsAdmin(false)
                    setIsLogged(true)
                    if (res.data.msg === "Phiên đã hết hạn") {
                        alert(res.data.msg)
                        window.location.href = ("/login")
                        localStorage.clear()
                    }
                    
                } catch (err) {
                    console.log(err.response)
                }
            }
            getUser()
        }
    }, [token])

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        user: [user, setUser]
    }
}

export default UserAPI




