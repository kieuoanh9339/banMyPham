import React, { useContext, useState } from 'react'
import item1 from '../../header/icons/item1.jpg'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import "./ProductItem.css"
function ProductItem({ product, isAdmin }) {
    // const state = useContext(GlobalState)
    // const [isAdmin, setIsAdmin]= state.userAPI.IsAdmin
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
                                <button className='btnDel'>
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




