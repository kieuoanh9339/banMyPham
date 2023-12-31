import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { GlobalState } from '../../../GlobalState'
import axios from '../../../API/AxiosConfig'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./CreateProduct.css"


function CreateProduct() {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
    const [product, setProduct] = useState({
        product_name: "",
        price: 0,
        inventory: 0,
        desc: "",
        category: "",
        skinType: ""

    })
    const state = useContext(GlobalState)
    const [categories] = state.categoryAPI.category
    const [images, setImages] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const navigate = useNavigate()
    // navigate('/home');
    const param = useParams()
    const [products, setProducts] = state.productAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productAPI.callback
    const [inited, setInited] = useState(false)

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)

            const beProduct = products.find(p => p._id === param.id);
            if (!beProduct) return;
            setProduct(beProduct)
            setImages(beProduct.images)
            setInited(true)


        } else {
            setOnEdit(false)
            setImages(false)
            setInited(true)
            setProduct({
                product_name: "",
                price: 0,
                inventory: 0,
                desc: "",
                category: "",
                skinType: ""

            })
            console.log(product)
        }
    }, [param.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("you are not Admin")
            if (!images) return alert("no image found")
            if (onEdit) {
                const res = await axios.put(`/product/${product._id}`, { ...product, images }, {
                    headers: { Authorization: token }
                })
                console.log(res)
                if (res.status === 400) {
                    alert(res.data)
                } else{ alert(res.message);  navigate('/product')}
               
            } else {
                const res = await axios.post('/product', { ...product, images }, {
                    headers: { Authorization: token }
                })
                console.log(res)
                if (res.status === 400) {
                    alert(res.data)
                } else{ alert(res.message) ;  navigate('/product')}

            }

            setImages(false)
            setProduct({
                product_name: "",
                price: 0,
                inventory: 0,
                desc: "",
                category: "",
                skinType: ""

            })
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const onChangeInput = (name, value) => {
        setProduct({ ...product, [name]: value })
    }

    // console.log(product)

    const styleUpload = {
        display: images ? 'block' : 'none'
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You are not an  Admin")
            const file = e.target.files[0]
            console.log(file)
            if (!file) return alert("File not exist")
            if (file.size > 1024 * 1024) return alert("Size is too large")
            if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("file type not supported")

            let formData = new FormData();
            formData.append('file', file)
            const res = await axios.post('/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setImages(res)

        } catch (err) {
            alert(err.response.msg)
        }
    }

    const handleDestroy = async (e) => {
        try {
            if (!isAdmin) return alert('you are not an admin');
            await axios.post('/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setImages(false)

        } catch (err) {
            alert(err.response.msg)
        }
    }

    const skin_type = [{ name: "Da thường" }, { name: "Da khô" }, { name: "Da dầu" },{name:"Da hỗn hợp"}]


    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                <div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} alt="" />
                    <span onClick={handleDestroy} >x</span>
                </div>
            </div>
            <form>
                <div className="create-product-name">
                    <label htmlFor="product_name">Tên sản phẩm</label>
                    <input className="create-input" type="text" value={product.product_name} onChange={(e) => onChangeInput("product_name", e.target.value)}
                    />
                </div>

                <div className="create-product-price">
                    <label htmlFor="price">Giá</label>
                    <input className="create-input" type="number" value={product.price} onChange={(e) => onChangeInput("price", parseInt(e.target.value))}
                    />
                </div>
                <div className="create-product-price">
                    <label htmlFor="price">Số lượng</label>
                    <input className="create-input" type="number" value={product.inventory} onChange={(e) => onChangeInput("inventory", parseInt(e.target.value))}
                    />
                </div>

                <div className="create-product-desc">
                    <label htmlFor="content">Mô tả</label>
                    <ReactQuill modules={modules}
                        formats={formats} value={product.desc} onChange={(e) => inited && onChangeInput("desc", e)} />
                    {/* <textarea className="create-input" rows="10" type="text" value={product.desc} onChange={(e) => onChangeInput("desc", e.target.value)} /> */}
                </div>
                <div className="product-category">
                    <label htmlFor="category" className='label-cate'>Danh mục</label>
                    <select name="category" id="category"
                        value={product.category} onChange={(e) => onChangeInput("category", e.target.value)}>
                        <option value="">Loại sản phẩm</option>
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
                    <label htmlFor="category" className='label-cate' >Loại da</label>
                    <select name="category" id="category"
                        value={product.skinType} onChange={(e) => onChangeInput("skinType", e.target.value)}>
                        <option value="">Loại da</option>
                        {
                            skin_type.map(c => (
                                <option value={c.name}>
                                    {c.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button onClick={handleSubmit}> {onEdit ? "Sửa sản phẩm" : "Tạo sản phẩm"}</button>
            </form>

        </div>
    )
}

export default CreateProduct