const express = require("express")
const tokenCheck = require("../Middlewares/token-check")
const { GetAllProduct, AddProduct, GetProduct, EditeProduct, DeleteProduct } = require("../Controllers/controller-product")
const { AllowTo } = require("../Middlewares/user-check")
const route = express.Router()
route.use(express.json())



route.route("/")
.get(GetAllProduct)
.post(tokenCheck , AllowTo("Manger"), AddProduct)



route.route("/:idProduct")
.get(GetProduct)
.patch(tokenCheck, AllowTo("Manger"),EditeProduct)
.delete(tokenCheck, AllowTo("Manger"),DeleteProduct)











module.exports = route