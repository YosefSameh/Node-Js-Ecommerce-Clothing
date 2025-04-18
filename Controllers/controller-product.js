const Products = require("../Modules/module-product")

const GetAllProduct = async (req,res)=>{
    const limit = parseInt(req.query.limit) 
    const page = parseInt(req.query.page)
    const skip = (page-1) * limit
    const sort = req.query.sort || "";
    const categories = req.query.categories || ""
try{
        let products;
        let sortOrder = sort === "desc" ? -1 : 1;
        let query = {};

        
        if (categories !== "") {
            query.Categroire = categories;
        }

        const totalProducts = await Products.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);
        
        if(sort !== ""){
            products = await Products.aggregate([
                {
                    $addFields: {
                        PriceAsNumber: { $toDouble: "$Price" } , 
                         
                    }
                },
                { $match: query },
                { $sort: { PriceAsNumber: sortOrder } },
                { $skip: skip },  
                { $limit: limit } 
            ]);
        }
        else{
            
            products =  await Products.find(query).limit(limit).skip(skip)
        }

        res.status(200).json({status :"Successful",data:{
            Products:products,
            totalPages: totalPages,
            currentPage: page,
            totalProducts: totalProducts
        }})
    }

    catch(error){
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
}


const GetProduct = async (req,res)=>{
    const idProduct = req.params.idProduct
    try{
        if(!idProduct){
            return res.status(404).json({status:"Fail",data:{Massege:"Can Not Get This Id"}})
        }

        const product = await Products.findById(idProduct)
        

        res.json({status:"Successful",data:{Products:product}})
    }
    catch(error){
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
}


const AddProduct = async (req,res)=>{
    const {Titel,Price,Detaials,Categroire,Imgs} = req.body

    try{
        if(!Titel && !Price && !Detaials && !Categroire){
            
            return res.status(404).json({status:"Fail",data:{Massege:"Input Is Emty"}})
        }
        const ProductNew = new Products({   
            Titel,
            Price,
            Detaials,
            Categroire,
            Imgs,
        })

        await ProductNew.save()
        res.json({status:"Successful",data:{Products:ProductNew}})
    }
    catch(error){
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
}


const DeleteProduct = async (req,res)=>{
    const idProduct = req.params.idProduct
    try{
        if(!idProduct){
            return res.status(404).json({status:"Fail",data:{Massege:"Can Not Get This Id"}})
        }
        const deleteProduct = await Products.deleteOne({_id:idProduct})

        res.json({status:"Successful",data:{Products:deleteProduct}})
    }
    catch(error){
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
}


const EditeProduct = async (req, res) => {
    const idProduct = req.params.idProduct;

    try {
        if (!idProduct) {
            return res.status(404).json({ status: "Fail", data: { Message: "Cannot Get This ID" } });
        }

        
        const existingProduct = await Products.findById(idProduct);

        if (!existingProduct) {
            return res.status(404).json({ status: "Fail", data: { Message: "Product not found" } });
        }

        console.log(req.body.Imgs, "test " , );
        console.log(existingProduct.Imgs, "test2 " , );
        
        
        const updatedData = {
            Titel: req.body.Titel || existingProduct.Titel, 
            Price: req.body.Price || existingProduct.Price,
            Categroire: req.body.Categroire || existingProduct.Categroire, 
            Imgs: existingProduct.Imgs,
            // Imgs:!req.body.Imgs.length === 0 ? req.body.Imgs :existingProduct.Imgs, 
            Detaials:req.body.Detaials ||  existingProduct.Detaials, 
        };

        await Products.updateOne({ _id: idProduct }, { $set: updatedData });

     
        const ProductEdit = await Products.findById(idProduct);

        res.json({ status: "Successful", data: { Products: ProductEdit } });
    } catch (error) {
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
};




module.exports = {
    GetAllProduct,
    AddProduct,
    DeleteProduct,
    EditeProduct,
    GetProduct,
}