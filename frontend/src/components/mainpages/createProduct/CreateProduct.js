import React from 'react'
import "./CreateProduct.css"

function CreateProduct() {
    const skin_type = [{ name: "Normal skin" }, { name: "Dry Skin" }, { name: "Oily Skin" }]
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" />
               
            </div>
            <form>
                <div className="create-product-name">
                    <label htmlFor="product_id">Name</label>
                    <input className="create-input" type="text" name="name"
                    />
                </div>
                
                <div className="create-product-price">
                    <label htmlFor="price">Price</label>
                    <input className="create-input" type="text" name="price" id="price"
                    />
                </div>
                <div className="create-product-price">
                    <label htmlFor="price">Inventory</label>
                    <input className="create-input" type="number" name="price" id="price"
                    />
                </div>
                
                <div className="create-product-desc">
                    <label htmlFor="content">Description</label>
                    <textarea className="create-input" rows="10" type="text" name="content" id="content"
                    />
                </div>
                <div className="product-category">
                    <label htmlFor="category" className='label-cate'>Category</label>
                    <select name="category" id="category"
                      value={""} >
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
                <div className="product-skintype">
                    <label htmlFor="category" className='label-cate' >Skin type</label>
                    <select name="category" id="category"
                      value={""} >
                          <option value="">SKin Type</option>
                        {
                            skin_type.map(c => (
                                <option value={c.name}>
                                    {c.name}
                                </option>
                            ))
                        }
                      </select>
                </div>
                <button type="submit"> Create Product</button>
            </form>
             
        </div>
    )
}

export default CreateProduct