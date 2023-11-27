import React, { useEffect, useContext, useState } from 'react'
import Dry from "./img/1_Dry.avif"
import Oily from "./img/1_Oily.avif"
import Normal from "./img/1_Normal.avif"
import Combo from "./img/1_Combo.avif"
import Acne from "./img/acne.avif"
import Aging from "./img/aging.avif"
import Uneven from "./img/uneven.avif"
import Sensitive from "./img/sensitive.avif"
import "./Tip.css"
import axios from '../../../API/AxiosConfig'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import ProductItem from '../../utils/productItem/ProductItem'
function Tip() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [blog, setBlog] = useState([])
    const [display, setDisplay] = useState("")
    const [click, setClick] = useState(false)
    const [oily, setOily]= useState(false)
    const [dry, setDry]= useState(false)
    const [normal, setNormal]= useState(false)
    const [combo, setCombo]= useState(false)
    const [skinType, setSkinType] = state.productAPI.skinType
    const [products] = state.productAPI.products

    useEffect(() => {
        const getBlog = async () => {
            const res = await axios.get("/blog")
            setBlog(res.blog)
        }
        getBlog()
    }, [])

    return (
        <div className='tip-parent'>
            {
                isAdmin ? <></> : <>
                    <div className='find-type'>
                        <div className='header-tip'>
                            <h1>Tìm hiểu loại da của bạn</h1>
                        </div>
                        <div className='desc-tip'>
                            <i>Note:Rửa mặt sạch bằng sữa rửa mặt dịu nhẹ và đợi 15 – 30 phút. Nhấp vào biểu tượng phù hợp với những gì bạn nhìn thấy </i>
                        </div>
                        <div className='type-skin'>
                            <div className='infor-skin' style={{border: dry?"2px solid":"none"}} onClick={() => {
                                setDisplay("Da của bạn là da khô. Có rất nhiều lý do khiến da bạn bị khô, nhưng đơn giản nhất là cảm giác căng, khó chịu liên quan đến loại da này xuất phát từ việc thiếu bã nhờn và lipid - những chất sáp chịu trách nhiệm giữ ẩm. Nhưng! Với các thành phần và công thức phù hợp, bạn có thể có được làn da mềm mại, được nuôi dưỡng.");
                                setSkinType("Da khô")
                                setClick(true)
                                setDry(true)
                                setOily(false)
                                setNormal(false)
                                setCombo(false)
                            }}>
                                <div className='dry-skin'>
                                    
                                    <div className='img-dry' style={{ maxWidth: "100px" }}>
                                        <img src={Dry} style={{ maxWidth: "100px" }}></img>
                                    </div>
                                    <div className='inf-dry'>Cảm thấy căng và mất nước. Một số chỗ bong tróc.</div>
                                </div>
                            </div>
                            <div className='infor-skin' style={{border: oily?"2px solid":"none"}} onClick={() => {
                                setDisplay("Da của bạn là da dầu. Loại da này xảy ra khi da tiết ra quá nhiều bã nhờn - chất sáp có thể khiến lỗ chân lông to và bóng nhờn quá mức. Nhưng! Với các thành phần và công thức phù hợp, bạn có thể có được làn da cân bằng, mịn màng.")
                                setSkinType("Da dầu")
                                setClick(true)
                                setDry(false)
                                setOily(true)
                                setNormal(false)
                                setCombo(false)
                            }}>
                                <div className='dry-skin'>
                                    
                                    <div className='img-dry'>
                                        <img src={Oily} style={{ maxWidth: "100px" }}></img>
                                    </div>
                                    <div className='inf-dry'>Trông bóng và nhờn khi chạm vào</div>
                                </div >
                            </div>
                            <div className='infor-skin' style={{border: combo?"2px solid":"none"}} onClick={() => {
                                setDisplay("Da của bạn là da hỗn hợp. Loại da siêu phổ biến này xảy ra khi một số bộ phận trên khuôn mặt tiết ra quá nhiều bã nhờn (chất sáp giữ ẩm cho da) và các bộ phận khác không sản xuất đủ. Với sự kết hợp phù hợp giữa các thành phần và công thức, bạn có thể có làn da khỏe mạnh, cân bằng hơn.")
                                setSkinType("Da thường")
                                setClick(true)
                                setDry(false)
                                setOily(false)
                                setNormal(false)
                                setCombo(true)
                            }}>
                                <div className='dry-skin'>
                                    
                                    <div className='img-dry'>
                                        <img src={Normal} style={{ maxWidth: "100px" }} ></img>
                                    </div>
                                    <div className='inf-dry'>Cảm thấy mịn màng, cân bằng và khỏe mạnh</div>
                                </div>
                            </div>
                            <div className='infor-skin' style={{border: normal?"2px solid":"none"}} onClick={() => {
                                setDisplay("Da của bạn là da thường. Xin chúc mừng, bạn đã trúng số độc đắc về mặt di truyền! Loại da hiếm gặp này có tỷ lệ dầu-nước phù hợp, giữ cho da mịn màng, trong trẻo và cân bằng hoàn hảo. Bảo vệ và phòng ngừa là chìa khóa để giữ mọi thứ ở trạng thái trung tính tự nhiên.")
                                setSkinType("Da hỗn hợp")
                                setClick(true)
                                setDry(false)
                                setOily(false)
                                setNormal(true)
                                setCombo(false)
                            }}>
                                
                                <div className='dry-skin'>
                                    
                                    <div className='img-dry'>
                                        <img src={Combo} style={{ maxWidth: "100px" }} ></img>
                                    </div>
                                    <div className='inf-dry'>Cảm thấy bóng nhờ ở vùng chữ T nhưng khô ở vùng khác.</div>
                                </div>
                            </div>
                        </div>
                        {
                            click && <div className='display-typeSkin' >
                                <h2>Kết quả da của bạn</h2>
                                <p >{display}</p>
                            </div>
                        }
                        {
                            click && <>
                                <div style={{ marginLeft: "100px", fontWeight: "bold", paddingTop: "10px" }}>
                                    Một số sản phẩm dành cho bạn:
                                </div>
                                <div className='list-products'>

                                    {
                                        products?.map(product => {
                                            return <ProductItem key={product._id} product={product} isAdmin={isAdmin} />
                                        })
                                    }
                                </div>
                            </>
                        }

                    </div>

                </>
            }
            <div className='blog'>
                <div className='create-blog'>
                    {
                        isAdmin && (<Link to="/create-blog">
                            <button className='btnCreate'>
                                Tạo Blog
                            </button>
                        </Link>)
                    }
                </div>
                <div className='header-tip'>
                    <h1>Danh sách Blog</h1>
                </div>
                <div className='list-blog'>
                    {
                        blog.map(e => {
                            return <>
                                <div className='blog-item'>
                                    {isAdmin ? <Link to={`/edit_blog/${e._id}`} >
                                        <i>{e.title}</i>
                                    </Link> : <Link to={`/blog/${e._id}`} >
                                        <i>{e.title}</i>
                                    </Link>}
                                </div>

                            </>
                        })
                    }
                </div>

            </div>
        </div>
    )
}
export default Tip