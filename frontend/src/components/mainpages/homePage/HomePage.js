import React,{ useContext } from 'react'
import "react-slideshow-image/dist/styles.css";
import banner1 from "../../header/icons/b1.webp"
import banner3 from "../../header/icons/b5.jpg"
import banner4 from "../../header/icons/b6.jpg"
import banner5 from "../../header/icons/b8.jpg"
import tip from "../../header/icons/tip.avif"
import cs1 from "../../header/icons/sc1"
import SlideShow from '../../utils/slideShow/SlideShow';
import { GlobalState } from '../../../GlobalState'
import './HomePage.css'
import ProductItem from '../../utils/productItem/ProductItem'
function HomePage() {
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const fadeImages = [banner4, banner1, banner3, banner5];
    const skin_type = [{ name: "Normal skin" }, { name: "Dry Skin" }, { name: "Oily Skin" }]
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
                    Shop Customer Favorites
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
                            SERUM
                        </button>
                    </div>
                </div>
            </div>
            <div className='img-tip'>
                <img src={tip} />
            </div>
            <div className='select-tip'>
                <div className='find-pro'>
                    Find Your Right Product:
                </div>
                <div className='looking-for'>
                    <h3>I have </h3>
                    <select name="Skin Tpye" className='select-skin'>
                        <option value="">Skin Type</option>
                        {
                            skin_type.map(c => (
                                <option value={c.name}>
                                    {c.name}
                                </option>
                            ))
                        }
                    </select>
                    <h3>& I'm looking for</h3>
                    <select name="Product Tpye" className='select-product'>
                        <option value="">Product Type</option>
                        {
                            skin_type.map(c => (
                                <option value={c.name}>
                                    {c.name}
                                </option>
                            ))
                        }
                    </select>
                </div>


                <button className='btnFind'>
                    FIND SOLUTIONS
                </button>

            </div>
            <div className='title-new-product'>
                <h1>
                    New Products
                </h1>
            </div>

            <div className='new-product'>
            {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} isAdmin={isAdmin} />
                    })
                }

            </div>
        </div>
    )
}


export default HomePage




