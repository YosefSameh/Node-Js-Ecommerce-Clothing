const { default: mongoose } = require("mongoose");

const ProductShcema = new mongoose.Schema({

    Titel:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Detaials:{
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
    Date: {
        type: String,
        default: () => new Date().toLocaleString('en-GB', {
            timeZone: 'Africa/Cairo',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          })   
      }

})


module.exports = mongoose.model("Procuct-clothing",ProductShcema)
