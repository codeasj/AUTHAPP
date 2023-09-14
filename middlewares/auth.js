const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {
    try{
        ///extract jwt token
        const token = req.cookies.token||req.body.token||req.header("Authorization").replace("Bearer ", "");
        
        if(!token){
            return res.status(401).json({
                success: false,
                message:'Token missing'
            });
        }
        
        //verify the token
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            req.user = payload;
        } catch(error){
            return res.status(401).json({
                success:false,
                message:'Token is invalid'
            });
        }
        next();    
    } catch(error){
        return res.status(401).json({
            sucess:false,
            message:"Something went wrong, while verifying the token"
        });
    }
}

exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role!=="Student") {
            return res.status(401).json({
                success: false,
                message:'This is aprotected route for students'
            });
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        });
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin"
            });
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role is not matching'
        });
    }
}
