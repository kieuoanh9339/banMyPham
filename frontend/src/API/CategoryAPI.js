import { useState, useEffect } from "react"
import axios from "../API/AxiosConfig"
import { set } from "mongoose"

function CategoryAPI() {
    const [category, setCategory] = useState([])
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

    }, [])
    return {
        category: [category, setCategory]
    }
}

export default CategoryAPI




