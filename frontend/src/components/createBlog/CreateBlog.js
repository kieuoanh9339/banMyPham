import React, { useState, useEffect, useContext } from 'react'
import ReactQuill from 'react-quill';
import "./CreateBlog.css"

import axios from '../../API/AxiosConfig'
import { useNavigate, useParams } from 'react-router-dom';

function CreateBlog() {
    const param = useParams()
    const navigate = useNavigate()
    const [onEdit, setOnEdit] = useState(false)
    const [inited, setInited] = useState(false)
    const [blog, setBlog] = useState({
        title: "",
        content: ""

    })
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            const getBlog = async () => {
                const res = await axios.get(`/blog/${param.id}`)
                setBlog(res.blog)
                setInited(true)
                console.log(blog);
            }

            getBlog()
        } else {
            setOnEdit(false)

            setBlog({
                title: "",
                content: ""
            })

        }
    }, [param.id])

    const onChangeInput = (name, value) => {
        setBlog({ ...blog, [name]: value })
    }
    const handleSubmit = async () => {
        if (onEdit) {
            const res = await axios.put(`/blog/${blog._id}`, { ...blog})
           
            if (res.status === 400) {
                alert(res.data)
            }
            alert("thanh cong")
            navigate("/tip")
        } else {
            const res = await axios.post("blog", { ...blog })
            console.log(res);
            alert("thanh cong")
            navigate("/tip")
        }
    }
    return (
        <div className="create-blog" style={{ maxWidth: "700px", margin: "20px auto" }}>
            <div className="create-titel">
                <label htmlFor="title" style={{ marginRight: "10px" }}>Title</label>
                <input className="create-input" type="text" value={blog.title} onChange={(e) => onChangeInput("title", e.target.value)} style={{ padding: "5px", width: "100%" }}
                />
            </div>

            <div className="create-product-desc">
                <label htmlFor="content" style={{ marginBottom: "10px" }}>Description</label>
                <ReactQuill modules={modules}
                    formats={formats} value={blog.content} onChange={(e) => inited && onChangeInput("content", e)} />
                {/* <textarea className="create-input" rows="10" type="text" value={product.desc} onChange={(e) => onChangeInput("desc", e.target.value)} /> */}
            </div>
            <button className='btn-create' onClick={handleSubmit}> {onEdit ? "Update" : "Create Blog"} </button>
        </div>

    )
}

export default CreateBlog
