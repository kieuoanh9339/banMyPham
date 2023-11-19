import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./BlogDetail.css"
import axios from '../../../API/AxiosConfig'
function BlogDetail() {
    const param = useParams();
    const [blogs,setBlogs]=useState([])
    const [blog,setBlog]=useState({})

    useEffect(() => {
        const getBlog = async () => {
            const res = await axios.get(`/blog/${param.id}`)
            setBlog(res.blog)
        }
        
        getBlog()
        
    },[param.id])
    
    console.log(blog)
    return (
    <div className='blog-detail' style={{margin:"40px"}}>
        <div className='title-blog' style={{display:"flex", justifyContent:"center", margin:"20px"}}>
            <h2>{blog?.title}</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: blog.content}}></div>
        
    </div>
    )
}
export default BlogDetail