import { useState, useEffect } from "react"
import axios from "../API/AxiosConfig"
import { set } from "mongoose"

function CategoryAPI() {
    const [category, setCategory] = useState([])
    const [callback, setCallback] = useState(false)
    useEffect(() => {
        
            const getCategory = async () => {
                try {
                    const res = await axios.get('category')

                    setCategory(res.category)
                } catch (err) {
                    console.log(err)

                }
            }
            getCategory()

    }, [callback])
    return {
        category: [category, setCategory],
        callback:[callback,setCallback]
    }
}

export default CategoryAPI




