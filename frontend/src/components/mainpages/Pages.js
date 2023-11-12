import React from 'react'
import { BrowserRouter as Router,Switch, Route, Routes } from 'react-router-dom'
import Products from './products/Products'
import Cart from './cart/Cart'
import Login from './auth/Login'
import Register from './auth/Register'
import ProductItem from '../utils/productItem/ProductItem'
import HomePage from './homePage/HomePage'
import NotFound from '../utils/not_found/NotFound'
import ProductDetail from './ProductDetail/ProductDetail'
import CartElement from '../utils/CartElement/CartElement'
import CreateProduct from './createProduct/CreateProduct'
import CreateCategory from './createCategory/CreateCategory'
import MyOrder from './order/MyOrder'
import Payment from './checkout/Payment'
import MyProfile from './myProfile/MyProfile'
import Tip from './tip/Tip'
import test from './ProductDetail/test'
function Pages(){
    return (
       <Routes>
            <Route path='/product' exact Component={Products}/>
            <Route path='/cart' exact Component={Cart}/>
            <Route path='/login' exact Component={Login}/>
            <Route path='/register' exact Component={Register}/>
            <Route path='/item' exact Component={ProductItem}/>
            <Route path='/' exact Component={HomePage}/>
            <Route path='/cart-item' exact Component={CartElement}/>
            <Route path='/product/:id' exact Component={ProductDetail}/>
            <Route path='/create-product' exact Component={CreateProduct}/>
            <Route path='/edit_product/:id' exact Component={CreateProduct}/>
            <Route path='/create-category' exact Component={CreateCategory}/>
            <Route path='/my-order' exact Component={MyOrder}/>
            <Route path='/checkout' exact Component={Payment}/>
            <Route path='/my-account' exact Component={MyProfile}/>
            <Route path='/tip' exact Component={Tip}/>

       </Routes>
    )
}


export default Pages




