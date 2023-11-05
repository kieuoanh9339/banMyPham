import React, { useContext, useState } from 'react'
import "./CreateCategory.css"
import { GlobalState } from '../../../GlobalState'
import axios from '../../../API/AxiosConfig'
function CreateCategory() {
    const state = useContext(GlobalState)
    const [categories, setCategories] = state.categoryAPI.category
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoryAPI.callback
    const [edit, setEdit] = useState(false)
    const [id, setID] = useState('')

    console.log(categories)
    const createCategory = async (e) => {
        e.preventDefault()
        try {
            if (edit) {
                const res = await axios.put(`/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                })
                console.log(res)
                if(res.status===400){
                    alert(res.data.msg)
                }else alert(res.msg)
                setEdit(false)
            } else {
                const res = await axios.post('/category', { name: category }, {
                    headers: { Authorization: token }
                })
                console.log(res)
                if(res.status===400){
                    alert(res.data.msg)
                }
                else alert(res.msg)
                
            }
            setCategory('')
            setCallback(!callback)
        } catch (err) {
            alert(err.response.msg)
        }
    }
    const editCategory = async ( id,name) => {
        setID(id)
        setCategory(name)
        setEdit(true)
    }
    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/category/${id}`, {
                headers: { Authorization: token }
            })
            alert(res.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.msg)
        }
    }
    return (

        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <button type="submit"> {edit ? " Update" : "Save"} </button>
            </form>
            <div className="col">
                {
                    categories.map(e => {
                       return <div className="row" >
                            <p>{e.name}</p>
                            <div>
                                <button onClick={()=>editCategory(e._id, e.name)}>Edit</button>
                                <button onClick={()=>deleteCategory(e._id)}>Delete</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default CreateCategory
