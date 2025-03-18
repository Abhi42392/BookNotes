
import jwt from 'jsonwebtoken'

const authUser=async(req,res,next)=>{
    const{token}=req.headers;
    try{
        if(token){
            const decode_token=jwt.verify(token,process.env.JWT_SECRET);
            req.body.userId=decode_token.id;
            next();
        }else{
            return res.json({success:false,message:"Unauthorised Authentication"});
        }
    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message});
    }
}

export default authUser