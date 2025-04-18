const Users = require("../Modules/module-user")
const bcrupt = require("bcryptjs")
const JWT = require("jsonwebtoken")

const Rigster = async (req,res)=>{
    
    const {firstName,lastName,email,password,role} = req.body
    
    try{
        const hashingPassword = await bcrupt.hash(password,10)

        if(!email && !password && !firstName){
            return res.status(404).json({status:"Fale",data:{Massege:"Emali or Password or FirstName Is Require"}})
        }
        const newUser = new Users({
            firstName,
            lastName,
            email,
            password:hashingPassword,
            role
        })

        const token = await JWT.sign({email:newUser.email, id:newUser._id, firstName:newUser.firstName, lastName:newUser.lastName,role:newUser.role},process.env.JWTSECRYT)
        newUser.token = token
        await newUser.save()

        res.status(201).json({status:"Successful",data:{Users:newUser}})
    }
    catch(error){
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
}
const Login = async (req,res)=>{
    
    const {email,password} = req.body
    try{
        if(!email && !password){
            return res.status(404).json({status:"Fale",data:{Massege:"Emali Or Password Is Require"}})
       }
        const user = await Users.findOne({email:email})

        if(!user){
            return res.status(404).json({status :"fail",data:"User Not Found"})
        }
        const unHachingPassword = await bcrupt.compare(password,user.password) 

        if(user && unHachingPassword){
            
            // const token = await JWT.sign({email:user.email,id:user._id,firstName:user.firstName},process.env.JWTSECRYT)
            const token = await JWT.sign({ email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName,role:user.role },process.env.JWTSECRYT);
            
            res.status(200).json({status:"Successful",data:{Users:user}})
        }
        else{
            return res.status(404).json({status :"fail",data:"Somthing Error"}) 
        }
    }
    catch(error){
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
}
const GetUser = async (req,res)=> {
    try{
        if(!req.params.idUser){
            return res.status(404).json({status:"Fail",data:{Massege:"Can Not Get IdUser"}})
        }
        const user = await Users.findById(req.params.idUser)

        res.json({status:"Successful",data:{Users:user}})
    }

    catch(error){
        return res.status(500).json({ status: "Error", data: { Message: error.message } });
    }
}


module.exports = {
    Rigster,
    Login,
    GetUser,
}