import React, { useContext, useState } from 'react'
import item1 from '../../header/icons/item1.jpg'
import axios from '../../../API/AxiosConfig'
import { Link } from 'react-router-dom'
import {useNavigate, useParams} from "react-router-dom"
import { GlobalState } from '../../../GlobalState'
import "./ProductItem.css"
function ProductItem({ product, isAdmin }) {
    // const state = useContext(GlobalState)
    // const [isAdmin, setIsAdmin]= state.userAPI.IsAdmin
    const token= localStorage.getItem("token")
    const navigate = useNavigate()
    const deleteProduct = async()=> {
        try {
                    const destroyImg = await axios.post(`/destroy`, {public_id: product.images.public_id},{
                        headers: {Authorization: token}
                    })
                    const deleteProduct =await axios.delete(`/product/${product._id}`,{
                        headers: {Authorization: token}
                    })
                    alert(deleteProduct.msg)
                    window.location.href = "/product"
                } catch (err) {
                    alert(err.response.data.msg)
                }
    }
    return (
        <div className='productItem'>

            <div className='product-logo'>
                <img src={product.images.url} width="170px" height="170px" />
            </div>
            <div className='product-info'>
                <div className='category-item'>
                    <p>{product.category}</p>
                </div>
                <div className='product-name'>
                    {product.product_name}
                </div>
                <div className='product-price'>
                    ${product.price}
                </div>
            </div>
            <div >
                {
                    isAdmin ? (
                        <div className='btn-edit-del'>
                            <Link  to={`/edit_product/${product._id}`}>
                                <div>
                                    <button className='btnEdit'>
                                        EDIT
                                    </button>
                                </div>
                            </Link>
                            <div>
                                <button className='btnDel' onClick={()=>deleteProduct(product._id, product.images.public_id)}>
                                    DELETE
                                </button>
                            </div>
                        </div>

                    ) : (
                        <Link to={`/product/${product._id}`} >
                            <button className='btnBuy'>
                                VIEW
                            </button>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}


export default ProductItem




