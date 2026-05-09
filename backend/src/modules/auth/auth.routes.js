import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import * as controller from "./auth.controller.js";
import RegisterDto from "./dto/register.dto.js";
import { authenticate } from "./auth.middleware.js";
import LoginDto from "./dto/login.dto.js";
import ResetPasswordDto from "./dto/resetPassword.dto.js";
import ForgotPasswordDto from "./dto/forgotPassword.dto.js";

const router = Router()

router.post('/register',validate(RegisterDto),controller.register)
router.post('/login',validate(LoginDto),controller.login)//validate returns a function 
router.post('/logout',authenticate,controller.logout)
router.post('/forgot-password',validate(ForgotPasswordDto),controller.forgotPassword)
router.put('/reset-password/:token',validate(ResetPasswordDto),controller.resetPassword)
router.get('/me',authenticate,controller.getMe)//authenticate is a function
router.get('/verify-email/:token',controller.verifyEmail)
router.post("/refresh", controller.refreshToken);


export default router