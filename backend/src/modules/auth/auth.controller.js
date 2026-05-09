import ApiResponse from '../../common/utils/api-response.js'
import * as authService from './auth.service.js'

const register = async(req,res) => {
    const  user = await authService.register(req.body)
    ApiResponse.created(res,"Registration success. Please verify your email.",user)
}

const login = async(req,res) => {
    const  {user, accessToken,refreshToken} = await authService.login(req.body)

    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    
    ApiResponse.ok(res,"Login successfull",{user,accessToken})

}

const refreshToken = async(req,res) =>{
    const token = req.cookies?.refreshToken;
    const {accessToken,refreshToken} = await authService.refresh(token)
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    ApiResponse.ok(res, "Token refreshed", { accessToken });
}

const forgotPassword = async(req,res) =>{
    await authService.forgotPassword(req.body.email);
  ApiResponse.ok(res, "Password reset email sent");

}

const resetPassword = async (req, res) => {
  await authService.resetPassword(req.params.token, req.body?.password);
  ApiResponse.ok(res, "Password reset successful");
};

const logout = async(req,res) => {
    const userId = req.user.id
    
    await authService.logout(userId)
    res.clearCookie("refreshToken")
    ApiResponse.ok(res,"Logout success")
}

const getMe = async(req,res) => {

    const user = await authService.getMe(req.user.id)
    ApiResponse.ok(res,"User profile",user)
}

const verifyEmail = async(req,res) =>{
    const token = req.params.token
    await authService.verifyEmail(token)
    ApiResponse.ok(res,"Email verified")
}



export { register,login,logout,verifyEmail,getMe,refreshToken,resetPassword,forgotPassword}