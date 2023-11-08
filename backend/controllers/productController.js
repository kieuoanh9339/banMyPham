const Product= require('../models/productModel')

//sort, filtering, paginating
class APIfeatures{
    // constructor(query, queryString){
    //     this.query=query
    //     this.queryString= queryString
    // }
    // filtering(){
    //     const queryObj= {...this.queryString}
    //     // console.log({before:queryObj})
    //     const excludedFields= ['page', 'sort','limit']
    //     excludedFields.forEach(e => delete(queryObj[e]))
    //     let queryStr = JSON.stringify(queryObj)
    //     this.query.find(JSON.parse(queryStr))
    //     // console.log(queryStr)
    //     return this
    // }
    // sorting(){

    //     if(this.queryString.sort){
    //         const sortBy= this.queryString.sort.split(',').join(' ')
    //         this.query.sort(sortBy)
    //     }else{
    //         this.query.sort('price')
    //     }
    //     return this
    // }
    // paginating(){
    //     const page= this.queryString.page*1 || 1
    //     const limit= this.queryString.limit *1 || 20
    //     const skip= (page-1)*limit
    //     this.query= this.query.skip(skip).limit(limit)
    //     return this
    // } 
    constructor(query,queryString){
        this.query=query;
        this.queryString= queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}
        if(!queryObj.category) {
            delete(queryObj['category'])
        }
        if(!queryObj.skinType) {
            delete(queryObj['skinType'])
        }
        const excludedFields = ['page','sort','limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match) //gte lt means lessthan greater than
        
        this.query.find(JSON.parse(queryStr))
        
        return this;
    }
    sorting(){
        this.query = this.query.sort('sold')
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1 ) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    
    getAll: async (req,res) =>{
        try{
            
            const features= new APIfeatures(Product.find(), req.query).filtering().sorting().paginating()
            const products = await features.query
            res.status(200).json({
                status:"success",
                result:products.length,
                products
            });
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    // getById: async (req,res) =>{
    //     try{
    //         const product = await Product.findById(req.params.id);
    //         res.status(200).json({ message: "Get data successfully", data: product });
    //     }catch(err){
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // getByName: async (req,res) =>{
    //     try{
    //         const { product_name } = req.body;
    //         const product = await Product.find(req.query);
    //         res.status(200).json({ message: "Get data success!", data: product });
    //     }catch(err){
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // getByCategory: async (req,res) =>{
    //     try{
    //         const product = await Product.find({ category: req.body.category });
    //         res.status(200).json({ message: "Search success", data: product });
    //     }catch(err){
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    createProduct: async (req,res) =>{
        try{
            const{product_name, price,desc,images,category,inventory, skinType}=req.body
            const message1={}
            let check= 1
            if(product_name.trim().length===0){
                check= 0
                message1.product_name="This field is the required field"
            }
            if(price.toString().trim().length===0){
                check= 0
                message1.price="This field is the required field"
            }
            if(desc.trim().length===0){
                check= 0
                message1.desc="This field is the required field"
            }
            if(category.trim().length===0){
                check= 0
                message1.category="This field is the required field"
            }
            if(inventory.toString().trim().length===0){
                check= 0
                message1.inventory="This field is the required field"
            }
            if(!images) {
                check= 0
                message1.images= "No image upload"
            }
            if (skinType.trim().length === 0) {
                check= 0
                message1.skinType="This field is the required field"
            }
            if(check==0){
                return res.status(400).json(message1)
            }
            const newProduct = new Product(req.body);
            const product = await newProduct.save();
            res.status(200).json({ message: "Create product successfully", data: product });

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async (req,res) =>{
        try{
            const{product_name, price,desc,images,category,inventory, skinType}=req.body
            const message1={}
            let check= 1
            if(product_name.trim().length===0){
                check= 0
            }
            if(price.toString().trim().length===0){
                check= 0
            }
            if(desc.trim().length===0){
                check= 0
            }
            if(category.trim().length===0){
                check= 0
            }
            if(inventory.toString().trim().length===0){
                check= 0
            }
            if(!images) {
                check= 0
                message1= "No image upload"
            }
            if (skinType.trim().length === 0) {
                check= 0
            }
            if(check==0){
                return res.status(400).json("This field is the required field")
            }

            //update
            await Product.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: "Update product successfully"});

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async (req,res) =>{
        try{
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json({ msg: "Delete product successfully" });
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports= productCtrl


