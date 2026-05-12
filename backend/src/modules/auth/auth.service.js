import { sendResetPasswordEmail, sendVerificationEmail } from '../../common/config/email.js'
import crypto from 'crypto'
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from '../../common/utils/jwt.utils.js'
import User from './auth.model.js'
import ApiError from '../../common/utils/api-error.js'
import cookieParser from 'cookie-parser'

const hashToken =  (token)=>crypto.createHash("sha256").update(token).digest("hex")

const register = async ({email,password,name})=>{

    const existing = await User.findOne({email})

    if(existing){
        throw ApiError.conflict("Email already exists")
    }

    const {rawToken, hashedToken} = generateResetToken()

    const user = await User.create({
        name,
        email,
        password,
        verificationToken:hashedToken
    })

    
    
    const userObj = user.toObject()
    delete userObj._id
    delete userObj.password
    delete userObj.verificationToken
    

    // : send email to user with token : rawtoken
    try {
        console.log("I am inside send email")
        await sendVerificationEmail(email,name,rawToken)
    } catch (error) {
        console.log("Error sending mail:", error)
    }
    return userObj
}

const login = async ({email,password}) => {
    const user =  await User.findOne({email}).select('+password')
    if(!user){
         throw ApiError.badRequest("Bad credentials")
    }

    //password checking

   const isMatch = await user.comparePassword(password)
   if(!isMatch) throw ApiError.badRequest("Invalid email or password")

    if(!user.isVerified){
        throw ApiError.forbidden("Please verify your email before login")
    }

    const accessToken = generateAccessToken({id: user._id})
    const refreshToken = generateRefreshToken({id: user._id})

    user.refreshToken = hashToken(refreshToken)
    await user.save({validateBeforeSave:false})

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return {user:userObj, accessToken,refreshToken}
}

const refresh = async (token) => {// this is refresh token 

    /**
     * Check if token exists
     * Verify JWT
     * Fetch user from DB
     * Compare hashed token 
     * Generate new access + refresh tokens
     * Replace old refresh token (rotation)
     * Return both tokens 
     */
    if(!token){
        throw ApiError.unAuthorized("Refresh token token missing")
    }
    const decoded = verifyRefreshToken(token)
    
    const user = await  User.findById(decoded.id).select("+refreshToken")

    if(!user){
        throw ApiError.unAuthorized("User not found")
    }

    if(user.refreshToken !== hashToken(token)){
        throw ApiError.unAuthorized("Invalid refresh token") 
    }

    const accessToken = generateAccessToken({id:user._id})

    const refreshToken = generateRefreshToken({id: user._id})

    user.refreshToken = hashToken(refreshToken)
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}



}

const logout = async(userId) =>{
    // const user = await User.findById(userId)
    // if(!user){
    //     throw ApiError.unAuthorized("User not found")
    // }
    // user.refreshToken = null
    // user.save({validateBeforeSave:false})

    await User.findByIdAndUpdate(userId,{refreshToken: null})
}

const forgotPassword = async(email) =>{
    const user = await User.findOne({email})
    if(!user) throw ApiError.unAuthorized("No account found")

    const {rawToken,hashedToken} = generateResetToken()

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000
    await user.save()

    try {
        sendResetPasswordEmail(email,user.name,rawToken)
    } catch (error) {
        console.log(error)
    }    
}

const getMe = async(userId) =>{
    const user = await User.findById(userId)
    if(!user) throw ApiError.notfound("User not found")
    return user
}

const verifyEmail = async (token) => {
  const trimmed = String(token).trim();
  if (!trimmed) {
    throw ApiError.badRequest("Invalid or expired verification token");
  }

  // DB stores SHA256(raw). Links / email use the raw token — we hash for lookup.
  // If you paste the hash from MongoDB into Postman, hashing again would not match;
  // so we also try a direct match on the stored value.
  const hashedInput = hashToken(trimmed);
  let user = await User.findOne({ verificationToken: hashedInput }).select(
    "+verificationToken",
  )
  if (!user) throw ApiError.badRequest("Invalid or expired verification token");

  await User.findByIdAndUpdate(user._id, {
    $set: { isVerified: true },
    $unset: { verificationToken: 1 },///$unset removes a field from a document.
  });

  return user;
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = hashToken(token);

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  }).select("+resetPasswordToken +resetPasswordExpires");

  if (!user) throw ApiError.badRequest("Invalid or expired reset token");

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};
export {register,login,logout,refresh,forgotPassword,getMe,verifyEmail,resetPassword}