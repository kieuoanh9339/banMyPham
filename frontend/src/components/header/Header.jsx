import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from "react-router-dom"
import User from "./icons/user1.png"
import Cart from "./icons/cart.png"
import Paula from "./icons/paula.png"
import Search from "./icons/search.png"
import CartAPI from '../../API/CartAPI'
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
    const [categories]= categoryAPI.category//mảng cac category
    console.log(categories)
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

    const skinType=["Normal skin","Oily skin","Dry skin", "Combination skin"]
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
                        <img src={Search} alt='' width="25px" className='search-icon' />
                        <input type="text" placeholder="Search" className='search-input' />
                    </div>
                    <div className='user-dropdown'>
                        <img src={User} className='user-icon' width="35px" height="35px" onClick={toggleDropdown} />
                        {isOpen && (
                            <ul className="dropdown-login">
                                {isLoggedIn ? (
                                    <>
                                        <div className='islogin' onClick={toggleDropdown} >
                                            <Link to="/my-account">My account</Link>
                                        </div>
                                        <div className='islogin' onClick={toggleDropdown} >
                                            <Link to="/my-order">My order</Link>
                                        </div>
                                        <div className='islogin' onClick={LogOut} >
                                            <Link to="/">Logout</Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='islogin' onClick={toggleDropdown} >
                                            <Link to="/login">Login</Link>
                                        </div>
                                        <div className='islogin' onClick={toggleDropdown} >
                                            <Link to="/register">Register</Link>
                                        </div>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>
                    <div className='cart-icon'>
                        {isLoggedIn && <span>{amount}</span>}
                        {
                            token ? <Link to="/cart">
                                <img src={Cart} alt="" width="30" />
                            </Link> : <img src={Cart} alt="" width="30" onClick={displayAlert} />
                        }

                    </div>
                </div>
            </div>
            <div className='navbar'>
                <div className='category'>
                    {
                        !isAdmin ? (
                            <div class="dropdown">
                                <div class="dropbtn">Category</div>
                                {
                                    !isAdmin ? (<div>
                                            <div class="dropdown-content">
                                            {categories.map(e => {
                                                return <Link to="/product">
                                                     <a>{e.name}</a>
                                                </Link>
                                            })}
                                            </div>
                                        
                                    </div>) : (<></>)
                                }

                            </div>
                        ) : (
                            <Link to="/create-category">
                                <div className='dropdown'>
                                    <div className='dropbtn'>Category</div>
                                </div>
                            </Link>
                        )
                    }
                </div>
                <div className='product'>
                    <Link to="/product">
                        <button class="dropbtn">Product</button>
                    </Link>
                </div>
                {
                    !isAdmin ? (<div className='skin-type' >
                        
                            <div class="dropdown">
                                <button class="dropbtn">Skin Type</button>
                                {
                                    !isAdmin ? (<div>
                                            <div class="dropdown-content">
                                            {skinType.map(e => {
                                                return <Link to="/product">
                                                     <a>{e}</a>
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
                        <button class="dropbtn">Tips for your skin</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}


export default Header




