import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductAPI from '../../../API/ProductAPI'
import ProductItem from '../../utils/productItem/ProductItem'
import "./Product.css"
function Products() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [products] = state.productAPI.products
    const token=localStorage.getItem("token")
    console.log(token);
    
    return (
        <div className='products'>
            <div>
                <div className='button-create-product'>
                    {
                        isAdmin&&(<Link to="/create-product">
                        <button className='btnCreate'>
                            Create Product
                        </button>
                    </Link>)
                    }
                </div>
            </div>

            <div className='list-products'>
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} isAdmin={isAdmin}/>
                    })
                }
            </div>

        </div>
    )
}


export default Products




