import ApiError from "../utils/api-error.js"

const globalErrorHandler = (err, req, res, next) => {
    console.error(err); // logs the error in console
    
    let message = "Internal server Error"
    let statusCode = 500
    // Joi validation error
  if (err.isJoi) {
      statusCode = 400;
    message = err.details?.[0]?.message || "Validation error";
  }else if ( err instanceof ApiError) {
        message = err.message 
        statusCode  = err.statusCode
    }else if(err.name === "CastError"){
        message = "Invalid id format."
        statusCode = 400
    }else if(err.name === "TokenExpiredError"){
        message = "Session expired! please login again"
        statusCode = 403
    }else if(err.name === 'MongoServerError'){
        message = "Duplicate Error",
        statusCode = 409
    }
    res.status(statusCode).json({ 
        message,
        success:false,
        data: null
    });
}

export default globalErrorHandler