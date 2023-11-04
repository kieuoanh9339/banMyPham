import { useState, useEffect } from "react"

import axios from "../API/AxiosConfig"
import { set } from "mongoose"

function ProductAPI() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get('product')

            setProducts(res.products)
        }
        getProducts()
    }, [])

    return {
        products: [products, setProducts]
    }
}

export default ProductAPI




