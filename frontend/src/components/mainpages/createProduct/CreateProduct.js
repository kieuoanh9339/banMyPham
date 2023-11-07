import React, { useState, useEffect, useContext } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { GlobalState } from '../../../GlobalState'
import axios from '../../../API/AxiosConfig'
import "./CreateProduct.css"


function CreateProduct() {
    const [product, setProduct] = useState({
        product_name: "",
        price: 0,
        inventory: 0,
        desc: "",
        category: "",
        skinType: "",
        _id: ""

    })
    const state = useContext(GlobalState)
    const [categories] = state.categoryAPI.category
    const [images, setImages] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const navigate = useNavigate()
    const param = useParams()
    const [products, setProducts] = state.productAPI.products
    const [onEdit, setOnEdit] = useState(false)

    const onChangeInput = (name, value) => {
        setProduct({ ...product, [name]: value })// sao chép tất cả thuộc tính của đối tượng product hiện có va update thuoc tinh name = value
    }

    const styleUpload = {
        display: images ? 'block' : 'none'
    }

    const handleUpload = async (e) =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You are not an  Admin")
            const file = e.target.files[0]
            console.log(file)
            if(!file) return   alert("File not exist")
            if(file.size > 1024 * 1024) return alert("Size is too large")
            if(file.type !== "image/jpeg" && file.type !== "image/png") return alert("file type not supported")
    
            let formData = new FormData();
            formData.append('file', file)
            const res = await  axios.post('/upload', formData, {
                headers: {'content-type': 'multipart/form-data' , Authorization : token }
            })
            setImages(res)
    
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const skin_type = [{ name: "Normal skin" }, { name: "Dry Skin" }, { name: "Oily Skin" }]

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                <div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} alt="" />
                    <span >x</span>
                </div>
            </div>
            <form>
                <div className="create-product-name">
                    <label htmlFor="product_name">Name</label>
                    <input className="create-input" type="text" value={product.product_name} onChange={(e) => onChangeInput("product_name", e.target.value)}
                    />
                </div>

                <div className="create-product-price">
                    <label htmlFor="price">Price</label>
                    <input className="create-input" type="number" value={product.price} onChange={(e) => onChangeInput("price", e.target.value)}
                    />
                </div>
                <div className="create-product-price">
                    <label htmlFor="price">Inventory</label>
                    <input className="create-input" type="number" value={product.inventory} onChange={(e) => onChangeInput("inventory", e.target.value)}
                    />
                </div>

                <div className="create-product-desc">
                    <label htmlFor="content">Description</label>
                    <textarea className="create-input" rows="10" type="text" value={product.desc} onChange={(e) => onChangeInput("desc", e.target.value)}
                    />
                </div>
                <div className="product-category">
                    <label htmlFor="category" className='label-cate'>Category</label>
                    <select name="category" id="category"
                        value={product.category} onChange={(e) => onChangeInput("category", e.target.value)}>
                        <option value="">Product Type</option>
                        {
                            categories.map(c => (
                                <option value={c.name}>
                                    {c.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="product-skintype">
                    <label htmlFor="category" className='label-cate' >Skin type</label>
                    <select name="category" id="category"
                        value={product.skinType} onChange={(e) => onChangeInput("skinType", e.target.value)}>
                        <option value="">SKin Type</option>
                        {
                            skin_type.map(c => (
                                <option value={c.name}>
                                    {c.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit"> {onEdit ? "Edit Product" : "Create Product"}</button>
            </form>

        </div>
    )
}

export default CreateProduct