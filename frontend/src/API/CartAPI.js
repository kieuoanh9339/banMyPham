import { useState, useEffect } from "react"
import axios from "../API/AxiosConfig"


function CartAPI(token) {
    const [isLogged, setIsLogged] = useState()
    let total = 0
    const [cart, setCart] = useState({})
    const [cartItem, setCartItem] = useState([])
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        if (token) {
            const getActiveCart = async () => {
                try {
                    const res = await axios.get('/carts', {
                        headers: { Authorization: token }
                    })
                    if (res.status === 400) {
                        alert(res.data.msg)

                    }
                    setCart(res.cart)
                    setCartItem(res.cart.items)
                    // localStorage.setItem("amount",cartItem.length)
                    setAmount(res.cart.items.length)
                    localStorage.setItem("cartId", res.cart._id)

                } catch (err) {
                    console.log(err)

                }
            }
            getActiveCart()

        }
    }, [token])
    return {
        cart: [cart, setCart],
        amount: [amount, setAmount],
        cartItem: [cartItem, setCartItem]
    }
}

export default CartAPI




