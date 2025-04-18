

const User = require("../Modules/module-user");  
const Product = require("../Modules/module-product");  

const Save = async (req, res) => {
    const idUser = req.user.id;  
    const productId  = req.params.idProduct;  

    try {
        
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ status: "Fail", data: { Message: "User not found" } });
        }

        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "Fail", data: { Message: "Product not found" } });
        }

        
        const isProductSaved = user.saveProducts.some(fav => fav.ProductId.toString() === productId);
        if (isProductSaved) {
            return res.status(400).json({ status: "Fail", data: { Message: "Product already saved in favorites" } });
        }


        user.saveProducts.push({
            Titel: product.Titel,
            Price: product.Price,
            Categroire: product.Categroire,
            ProductId: product._id,
            Detaials:product.Detaials,
            Imgs:product.Imgs,
        });

         user.save();

        res.status(200).json({ status: "Successful", data: { Message: "Product saved to favorites", User: user } });
    } catch (error) {
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
};





const UnSave = async (req, res) => {
    const idUser = req.user.id;  
    const productId = req.params.idProduct;  

    try {
        
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ status: "Fail", data: { Message: "User not found" } });
        }

        
        const isProductSaved = user.saveProducts.some(fav => fav.ProductId.toString() === productId);
        if (!isProductSaved) {
            return res.status(400).json({ status: "Fail", data: { Message: "Product not found in favorites" } });
        }

        
        user.saveProducts = user.saveProducts.filter(fav => fav.ProductId.toString() !== productId);

        
        await user.save();

        res.status(200).json({ status: "Successful", data: { Message: "Product removed from favorites", User: user } });
    } catch (error) {
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
};






module.exports = {
    Save,
    UnSave
}