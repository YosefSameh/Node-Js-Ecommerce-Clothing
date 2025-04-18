const express = require("express")
const { GetUser, Rigster, Login } = require("../Controllers/controller-user")
const tokenCheck = require("../Middlewares/token-check")
const {  AddToCart, DeleteToCart, DeleteToAllCart } = require("../Controllers/controller-cart")
const { Save, UnSave } = require("../Controllers/controller-save")
const route = express.Router()
route.use(express.json())



route.route("/:idUser")
.get(tokenCheck,GetUser)

route.route("/rigster")
.post(Rigster)

route.route("/login")
.post(Login)


route.route("/cartshopping")
.post(tokenCheck,AddToCart)

route.route("/cartshopping/:idCart")
.delete(tokenCheck,DeleteToCart)

// route.route("/cartshoppingDeleteAll")
// .delete(tokenCheck,DeleteToAllCart)


route.route("/save/:idProduct")
.post(tokenCheck,Save)

route.route("/save/:idProduct")
.delete(tokenCheck,UnSave)



module.exports = route