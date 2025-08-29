import expressAsyncHandler from "express-async-handler";

export const admin= expressAsyncHandler(async(req,res,next)=>{
    if(req.user && req.user.role==="Admin"){
        next();
    }
    else{
        res.status(403).json({message:"Not authrozied as an Admin "})
    }
})
