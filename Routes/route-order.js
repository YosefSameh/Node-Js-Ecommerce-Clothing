const express = require("express")
const tokenCheck = require("../Middlewares/token-check")
const { GetAllOrders, AddOrder, DeleteOrder } = require("../Controllers/controller-order")
const { AllowTo } = require("../Middlewares/user-check")
const route = express.Router()
route.use(express.json())


route.route("/")
.get(GetAllOrders)
.post(tokenCheck,AddOrder)

route.route("/:idOrder")
.delete(tokenCheck , AllowTo("Manger"),DeleteOrder)

module.exports = route
