import { useState, useEffect } from "react"

import axios from "../API/AxiosConfig"


function ProductAPI() {

    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState([])
    const [callback,setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [skinType, setSkinType]= useState('')
    const [search, setSearch] = useState('')
    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/product?category=${category}&skinType=${skinType}&product_name=${search}`)

            setProducts(res.products)
            const res2 = await axios.get(`/product?limit=5`)

            setNewProduct(res2.products)
        }
        getProducts()
    }, [callback,category,skinType,search])

    return {
        products: [products, setProducts],
        newProduct: [newProduct, setNewProduct] ,
        callback: [callback,setCallback],
        category: [category, setCategory],
        skinType: [skinType,setSkinType],
        search: [search, setSearch]
    }
}

export default ProductAPI




