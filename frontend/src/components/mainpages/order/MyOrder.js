import React from 'react'
import CartShoppingItem from '../../utils/cartShoppingItem/CartShoppingItem'
import "./MyOrder.css"
function MyOrder(props) {
    const { orders } = props
    return (
        <div className='my-order'>
            <div className='my-order-element'>
                <div className='date-ordered'>
                    <div className='label-date-order'><p>DATE:</p></div>
                    <div className='pricce-total-order'><p>2023/10/09</p></div>
                </div>
                <div className='list-item-product-order'>
                    <CartShoppingItem orders={true} />
                    <CartShoppingItem orders={true} />
                    <CartShoppingItem orders={true} />
                </div>
                <div className='total-status'>
                    <div className="total-order">
                        <div className='label-total-order'><p>TOTAL:</p></div>
                        <div className='pricce-total-order'><p>$35.0</p></div>
                    </div>
                    <div className='status-order'>
                        <p>Completed</p>
                    </div>
                </div>
            </div>
            <div className='my-order-element'>
                <div className='date-ordered'>
                    <div className='label-date-order'><p>DATE:</p></div>
                    <div className='pricce-total-order'><p>2023/10/09</p></div>
                </div>
                <div className='list-item-product-order'>
                    <CartShoppingItem orders={true} />
                    <CartShoppingItem orders={true} />
                    <CartShoppingItem orders={true} />
                </div>
                <div className='total-status'>
                    <div className="total-order">
                        <div className='label-total-order'><p>TOTAL:</p></div>
                        <div className='pricce-total-order'><p>$35.0</p></div>
                    </div>
                    <div className='status-order'>
                        <p>Completed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MyOrder




