import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import anh1 from "../../header/icons/paulaTim.jpg"
import { GlobalState } from '../../../GlobalState'
import axios from '../../../API/AxiosConfig'
import "./ProductDetail.css"
function ProductDetail() {
    const params = useParams();
    const state = useContext(GlobalState)
    const token = localStorage.getItem("token")
    const [checkIncrease, setCheckIncrease] = useState(false)
    const [checkDecrease, setCheckDecrease] = useState(true)
    const [products] = state.productAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    const [quantity, setQuantity] = useState(1)

    const inventory = detailProduct.inventory

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) { setDetailProduct(product) }

            })
        }
    }, [products, params.id])
    let a = detailProduct._id
    const cart = {
        "product": a,
        "quantity": quantity
    }

    const onClickSubmit = async (e) => {
        let errMsg = ""
        let check = 0
        const res = await axios.post("/carts", { ...cart }, {
            headers: { Authorization: token }
        })
        if(res.status == 400) {
            alert(res.data.msg)
            check=1
        } 
        if(res.status == 200  || check==0){
            window.location.href = "/cart"
            alert("them thanh cong")
        }

    }

    const handleClickInCrease = () => {
        const tmp = quantity + 1;
        if (tmp >= 1) setCheckDecrease(false)
        if (tmp == inventory) {
            setCheckIncrease(true)
        }
        setQuantity(tmp);
    }

    const handleClickDecrease = () => {
        const tmp = quantity - 1;
        if (tmp <= inventory) setCheckIncrease(false)
        if (tmp == 1) {
            setCheckDecrease(true)
        }
        setQuantity(tmp);

    };

    if (detailProduct.length === 0) return 0;
    return (
        <div className='product-detail'>
            <div className='img-inv-sold'>
                <div > <img src={detailProduct.images.url} className='detail-img' /></div>
                <div className='inventory-sold'>
                    <div className='infor-inventory'>
                        <p>Inventory: {detailProduct.inventory}</p>
                    </div>
                    <div className='infor-sold'>
                        <p>Sold: {detailProduct.sold}</p>
                    </div>
                </div>

            </div>
            <div className='detail-product'>
                <div className='detail-infor'>
                    <div className='detail_product-name'>
                        {detailProduct.product_name}
                    </div>
                    <div className='detail-product-cate'>
                        {detailProduct.category}
                    </div>
                    <div className='detail-product-price'>
                        ${detailProduct.price}
                    </div>
                    <div className='detail-product-skintype'>
                        <div className='tilte-skintype'>
                            Skin type:
                        </div>
                        <div> Normal skin</div>
                    </div>
                    <div className='detail-product-description'>
                        <div className='title-desc'>Description: </div>
                        <div>{detailProduct.desc} </div>
                    </div>
                </div>
                <div className='add-product-quality-cart'>
                    <div className="cart-item-option">
                        <div className="cart-input-quantity">
                            <button
                                className="cart-input-select cart-input-sub" disabled={checkDecrease}
                                onClick={handleClickDecrease}
                            >
                                <i class="fas fa-minus"></i>
                            </button>
                            <input
                                type="text"
                                className="cart-input-display"
                                value={quantity}
                            />
                            <button
                                className="cart-input-select cart-input-add"
                                onClick={handleClickInCrease} disabled={checkIncrease}
                            >
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className='detail-add-to-cart'>
                        <Link >
                            <button className='btnLogin' onClick={(e) => onClickSubmit(e)}>
                                ADD TO CART
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductDetail




