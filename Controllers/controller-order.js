
const Order = require("../Modules/module-order")
const User = require("../Modules/module-user")


const GetAllOrders = async (req,res) => {
    
    try{
        const Orders = await Order.find()
        res.status(200).json({status :"Successful",data:Orders})
    }

    catch(error){
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
}


const AddOrder = async (req,res)=>  {
    const idUser = req.user.id
    const {Address,total} = req.body
    try{
        const user = await User.findById(idUser)
        if(!user){
            return res.status(404).json({status:"Fill",data:{Massege:"User Not Found"}})
        }
        if(user.cartShopping == "" ) {

            return res.status(404).json({status:"Fill",data:{Massege:"Cart Shopping Is Emty"}})
        }
        const newOrder = new Order({
            Orders:user.cartShopping,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            Address,
            total
        })

        await newOrder.save()
        user.cartShopping = [];
        await user.save();
        
        res.json({ status: "Successful", data: newOrder });
    }
    catch(error){
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }

}


const DeleteOrder = async (req, res) => {
    const idOrder = req.params.idOrder;  

    try {
        
        const deletedOrder = await Order.findByIdAndDelete(idOrder);    

        
        if (!deletedOrder) {
            return res.status(404).json({ status: "Fail", data: { Message: "Order not found" } });
        }

        res.status(200).json({ status: "Successful", data: { Message: "Order deleted successfully", Orders: deletedOrder } });
    } catch (error) {
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
};



module.exports = {
    AddOrder,
    GetAllOrders,
    DeleteOrder
}