const { default: mongoose } = require("mongoose");
const validator = require("validatorjs")

const CartShoppingSchema = new mongoose.Schema({
    Titel:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Categroire:{
        type:String,
        required:true
    },
    Imgs:{
        type:Array,
        // required:true
    },
    
    
    idUser:{
        type:String,
        required:true
    },
})
const SaveSchema = new mongoose.Schema({
    Titel:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Categroire:{
        type:String,
        required:true
    },
    Imgs:{
        type:Array,
        required:true
    },
    Detaials:{
        type:String,
        required:true
    },
    ProductId: mongoose.Schema.Types.ObjectId,
    
})

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
                const validation = new validator({ email: v }, { email: 'required|email' });
                return validation.passes();
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    role:{
        type:String,
        enum:["User","Manger"],
        default:"User"
    },
    saveProducts:[SaveSchema],
    cartShopping:[CartShoppingSchema],
})



module.exports = mongoose.model("User",UserSchema)