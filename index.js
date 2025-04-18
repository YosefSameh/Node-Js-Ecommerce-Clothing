const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
require('dotenv').config();
app.use(cors())


mongoose.connect(process.env.URL)
.then(()=>{
    console.log("Data Bace Is Conecting");
})
.catch((error)=>{
    console.log("error",error);
})


// const ProfileRoute = require("./Routes/profile.route")
// app.use("/api/profile",ProfileRoute)


// const FollowRoute = require("./Routes/following.route")
// app.use("/api/follow",FollowRoute)

const ProcuctRoute = require("./Routes/route-product")
app.use("/api/products",ProcuctRoute)


const UsersRoute = require("./Routes/route-user")
app.use("/api/users",UsersRoute)

const OrderRoute = require("./Routes/route-order")
app.use("/api/order",OrderRoute)



app.listen(process.env.PORT,()=>{
    console.log("listen for E-Commerce");
})

