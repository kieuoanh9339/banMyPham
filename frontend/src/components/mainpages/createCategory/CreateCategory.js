import React from 'react'
import "./CreateCategory.css"
import Input from '../../utils/input/Input'
function CreateCategory() {
    const onEdit = false
    return (

        <div className="categories">
            <form>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" />

                <button type="submit"> {onEdit ? " Update" : "Save"} </button>
            </form>
            <div className="col">
                <div className="row" >
                    <p>Serum</p>
                    <div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCategory
