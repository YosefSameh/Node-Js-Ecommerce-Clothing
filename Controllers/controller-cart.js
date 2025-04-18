const User = require("../Modules/module-user")

const AddToCart = async(req,res) =>{
    const idUser = req.user.id
    const {Titel,Price,Categroire,Imgs} = req.body
    
    try{

        const user = await User.findById(idUser);
            if (!user) {
                return res.status(404).json({ status: "Fail", data: { Message: "User not found" } });
            }
            const isProductInCart = user.cartShopping.some(cart => cart.Titel === Titel);
            
        if (isProductInCart) {
            return res.status(400).json({ status: "Fail", data: { Message: "This product is already in the cart!" } });
        }

            const cartNew = {
                Titel,
                Price,
                Categroire,
                idUser,
                Imgs
            }
            user.cartShopping.push(cartNew);
            await user.save();
            res.status(200).json({status:"Successful",data:{Users:user}})
    }

    catch(error){
        res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
}


const DeleteToCart = async(req,res) =>{
    const idUser = req.user.id;  
    const idCart  = req.params.idCart;  
    try {
    
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ status: "Fail", data: { Message: "User not found" } });
        }


        const cartIndex = user.cartShopping.findIndex(cart => cart._id.toString() === idCart);
        
        
        user.cartShopping.splice(cartIndex, 1);
        
        await user.save();

        res.status(200).json({ status: "Successful", data: { Message: "Cart item deleted successfully", Users: user } });
    } catch (error) {
        res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
};




module.exports = {
    AddToCart,
    DeleteToCart,
}
