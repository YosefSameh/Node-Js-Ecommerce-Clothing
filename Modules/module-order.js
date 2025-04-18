const { default: mongoose } = require("mongoose");

const OrdersShcema = new mongoose.Schema({

    Orders:{
        type:Array,
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    Address:{
        type:String
    },
    total:{
        type:Number 
    }
})


module.exports = mongoose.model("Order-clothing",OrdersShcema)