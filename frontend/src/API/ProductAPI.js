import { useState, useEffect } from "react"

import axios from "../API/AxiosConfig"
import { set } from "mongoose"

function ProductAPI() {

    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState([])
    const [callback,setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [skinType, setSkinType]= useState('')
    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/product?category=${category}&skinType=${skinType}`)

            setProducts(res.products)
            const res2 = await axios.get(`/product?limit=2`)

            setNewProduct(res2.products)
        }
        getProducts()
    }, [callback,category,skinType])

    return {
        products: [products, setProducts],
        newProduct: [newProduct, setNewProduct] ,
        callback: [callback,setCallback],
        category: [category, setCategory],
        skinType: [skinType,setSkinType]
    }
}

export default ProductAPI




