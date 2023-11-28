import React, { useContext } from 'react'
import "react-slideshow-image/dist/styles.css";
import banner1 from "../../header/icons/b1.webp"
import banner3 from "../../header/icons/b5.jpg"
import banner4 from "../../header/icons/b6.jpg"
import banner5 from "../../header/icons/b8.jpg"
import tip from "../../header/icons/tip.avif"
import cs1 from "../../header/icons/sc1"
import SlideShow from '../../utils/slideShow/SlideShow';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState'
import './HomePage.css'
import ProductItem from '../../utils/productItem/ProductItem'
function HomePage() {
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [newProduct] = state.productAPI.newProduct
    const [isAdmin] = state.userAPI.isAdmin
    const [categories] = state.categoryAPI.category
    const [category, setCategory] = state.productAPI.category
    const fadeImages = [banner4, banner1, banner3, banner5];
    const skin_type = ["Normal", "Dry", "Oily"]
    const [skinType, setSkinType] = state.productAPI.skinType
    console.log(newProduct)
    return (
        <div className='parent'>
            <div>
                <SlideShow
                    styleContainer={{
                        width: "100%"
                    }}
                    style={{ width: "100%", height: "400px" }}
                    srcImg={fadeImages}
                />
            </div>

            <div className='title'>
                <h1>
                    Sản phẩm được yêu thích
                </h1>
            </div>

            <div className='customer-fav'>
                <div className='fav-exfoliants'>
                    <img src={cs1} />
                    <div >
                        <button className='btn-category'>
                            EXFOLIANTS
                        </button>
                    </div>
                </div>
                <div className='fav-serum'>
                    <img src={cs1} />
                    <div >
                        <button className='btn-category'>
                            SERUM
                        </button>
                    </div>
                </div>
                <div className='fav-serum'>
                    <img src={cs1} />
                    <div >
                        <button className='btn-category'>
                            RETINOL
                        </button>
                    </div>
                </div>
            </div>
            <div className='img-tip'>
                <img src={tip} />
            </div>
            <div className='select-tip'>
                <div className='find-pro'>
                    Tìm kiếm sản phẩm của bạn
                </div>
                <div className='looking-for'>
                    <h3>Tôi có </h3>
                    <select name="Skin Tpye" className='select-skin' onChange={(e) => { 
                        setSkinType(e.target.value)
                     }}>
                        <option value="">Loại da</option>
                        {
                            skin_type.map(c => (
                                <option value={c} >
                                    {c} Skin
                                </option>
                            ))
                        }
                    </select>
                    <h3>& Tôi đang tìm kiếm</h3>
                    <select name="Product Tpye" className='select-product' onChange={(e) => { setCategory(e.target.value) }}>
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


                <div style={{display:"flex", alignItems:"center"}}>
                <Link to="product">
                    <button className='btnFind' >
                        Tìm kiếm giải pháp
                    </button>
                </Link>

                <Link to="tip">
                    <p style={{textDecorationLine:"none", fontSize: "14px", marginTop:"10px", marginLeft:"20px"}}>Tìm hiểu làn da!</p>
                </Link>
                </div>

            </div>
            <div className='title-new-product'>
                <h1>
                    Các sản phẩm mới
                </h1>
            </div>

            <div className='new-product'>
                {
                    newProduct?.map(product => {
                        return <ProductItem key={product._id} product={product} isAdmin={isAdmin} />
                    })
                }

            </div>
        </div>
    )
}


export default HomePage




