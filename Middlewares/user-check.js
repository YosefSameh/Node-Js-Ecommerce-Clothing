const AllowTo = (...roles) => {
    
    return (req,res,next)=> {
        
        if(!roles.includes(req.user.role)){
            return next(res.status(404).json({status:"Error",data:"User Is Not Access in This Route"}))
        }
        next()
    }
}

module.exports = {
    AllowTo,
}