import ApiError from "../../common/utils/api-error.js"
import { verifyAccessToken } from "../../common/utils/jwt.utils.js"
import User from './auth.model.js'



const authenticate = async(req,res,next) =>{
    let token 
    //appko lagi vaye cookie-parser ra cookie use garea.
    if(req.headers.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token) throw ApiError.unAuthorized("Not authenticated")
    
    const decoded =  verifyAccessToken(token)

    const user  = await User.findById(decoded.id)

    if(!user) throw ApiError.unAuthorized("User no longer exists")
    
    req.user = {
        id: user._id,
        email: user.email,
        name: user.name
    }

    next()

}


export{authenticate}