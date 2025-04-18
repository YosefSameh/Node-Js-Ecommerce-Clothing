const Jwt = require("jsonwebtoken")

const tokenCheck = (req,res,next)=>{

    const AuthHeaders =  req.headers["Authorization"] || req.headers["authorization"]

    if(!AuthHeaders){
        return  res.status(404).json({status :"Fail",data:{Message:"Token is Require"}})
    }
    try{
        const token = AuthHeaders.split(" ")[1]

        if (!token) {
            return res.status(401).json({ status: "Fail", data: { Message: "Token is malformed" } });
        }
        const unHachingToken = Jwt.verify(token,process.env.JWTSECRYT,(err,user)=>{

            if (err) {
                return res.status(403).json({ status: "Fail", data: { Message: "Invalid token",err } });
            }
            req.user = user
            next()
        })
        req.unHachingToken = unHachingToken
        
    }catch(error){
        res.status(404).json({status :"Fail",data:{Message:error}})
    }

}

module.exports = tokenCheck