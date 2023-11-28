import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from "react-router-dom"
import User from "./icons/user1.png"
import Cart from "./icons/cart.png"
import Paula from "./icons/paula.png"
import Search from "./icons/search.png"
import CartAPI from '../../API/CartAPI'
import ProductAPI from '../../API/ProductAPI'
import CategoryAPI from '../../API/CategoryAPI'
import "./Header.css"

function Header() {
    const state = useContext(GlobalState)
    const cartAPI = CartAPI(localStorage.getItem("token"))
    const amount = cartAPI.amount//so san pham trong gio
    const [isLoggedIn, setIsLogin] = state.userAPI.isLogged
    const [isAdmin, setAdmin] = state.userAPI.isAdmin
    const [isOpen, setIsOpen] = useState(false)
    const [token, setToken] = state.token
    const categoryAPI = CategoryAPI(localStorage.getItem("token"))
    const [categories] = categoryAPI.category//mảng cac category

    const [category, setCategory] = state.productAPI.category//filtering
    const [skinType, setSkinType] = state.productAPI.skinType//fi;tering
    const [search, setSearch] = state.productAPI.search
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const LogOut = () => {
        setIsOpen(!isOpen);
        localStorage.clear()
        setAdmin(false)
        setIsLogin(false)
        setToken("")
        alert("Logout successfully")
    };

    const displayAlert = () => {
        alert("You should login")
    }

    // const skin_Type = ["Normal", "Oily", "Dry","Combo"]
    const skin_Type = [{ name: "Da thường" }, { name: "Da khô" }, { name: "Da dầu" },{name:"Da hỗn hợp"}]

    // const changeFilter=(e) =>{
    //     setCategory('')
    //     setSkinType(e)
    // }
    const changeFilterCate = (e) => {
        setCategory(e)
        // setSkinType('')
    }

    return (
        <header>
            <div className='hotline'>
                HOTLINE SHOP PAULA'S CHOICE VIETNAM: 028.3622.5532
            </div>
            <div className='infor'>
                <div className='logo' >
                    <a href="/">
                        <img src={Paula} alt="" />
                    </a>
                </div>


                <div className='login-cart'>
                    <div className='search'>
                        <Link to="/product">
                            <img src={Search} alt='' width="25px" className='search-icon' />
                        </Link>
                        <input type="text" placeholder="Search" className='search-input' value={search} onChange={(e) => {
                            setSearch(e.target.value)
                            setCategory('')
                            setSkinType('')
                        }} />
                    </div>
                    <div className='user-dropdown'>
                        <img src={User} className='user-icon' width="35px" height="35px" onClick={toggleDropdown} />
                        {isOpen && (
                            <ul className="dropdown-login">
                                {isLoggedIn ? (
                                    <>
                                        {
                                            !isAdmin && <>
                                                <div className='islogin' onClick={toggleDropdown} >
                                                    <Link to="/my-account">Tài khoản</Link>
                                                </div>
                                                <div className='islogin' onClick={toggleDropdown} >
                                                    <Link to="/my-order">Đơn hàng</Link>
                                                </div>
                                            </>
                                        }
                                        <div className='islogin' onClick={LogOut} >
                                            <Link to="/">Đăng xuất</Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='islogin' onClick={toggleDropdown} >
                                            <Link to="/login">Đăng nhập</Link>
                                        </div>
                                        <div className='islogin' onClick={toggleDropdown} >
                                            <Link to="/register">Đăng ký</Link>
                                        </div>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>
                    {
                        !isAdmin && <div className='cart-icon'>
                            {isLoggedIn && <span>{amount}</span>}
                            {
                                token ? <Link to="/cart">
                                    <img src={Cart} alt="" width="30" />
                                </Link> : <img src={Cart} alt="" width="30" onClick={displayAlert} />
                            }

                        </div>
                    }
                </div>
            </div>
            <div className='navbar'>
                <div className='category'>
                    {
                        !isAdmin ? (
                            <div class="dropdown">
                                <div class="dropbtn">Loại sản phẩm</div>
                                {
                                    !isAdmin ? (<div>
                                        <div class="dropdown-content">
                                            {categories.map(e => {
                                                return <Link to="/product" onClick={() => {
                                                    setCategory(e.name)
                                                    setSkinType('')
                                                    setSearch('')
                                                }} >
                                                    <a >{e.name}</a>
                                                </Link>

                                            })}
                                        </div>

                                    </div>) : (<></>)
                                }

                            </div>
                        ) : (
                            <Link to="/create-category">
                                <div className='dropdown'>
                                    <div className='dropbtn'>Loại sản phẩm</div>
                                </div>
                            </Link>
                        )
                    }
                </div>
                <div className='product'>
                    <Link to="/product" onClick={() => {
                        setCategory('')
                        setSkinType('')
                        setSearch('')
                    }}>
                        <button class="dropbtn" >Sản phẩm</button>
                    </Link>
                </div>
                {
                    !isAdmin ? (<div className='skin-type' >

                        <div class="dropdown">
                            <button class="dropbtn">Loại da</button>
                            {
                                !isAdmin ? (<div>
                                    <div class="dropdown-content">
                                        {skin_Type.map(e => {
                                            return <Link to="/product" onClick={() => {
                                                setCategory('')
                                                setSkinType(e.name)
                                                setSearch('')
                                            }} >
                                                <a>{e.name} </a>
                                            </Link>
                                        })}
                                    </div>

                                </div>) : (<></>)
                            }
                        </div>
                    </div>) : (<></>)
                }

                <div className='category'>
                    <Link to="/tip">
                        <button class="dropbtn">
                            {isAdmin ? "Tạo Blog" : "Xu hướng làm đẹp"}
                        </button>
                    </Link>
                </div>
                {
                    isAdmin && <div className='category'>
                    <Link to="/my-order">
                        <button class="dropbtn">
                        Quản lý đơn hàng
                        </button>
                    </Link>
                </div>
                }
            </div>
        </header>
    )
}


export default Header




