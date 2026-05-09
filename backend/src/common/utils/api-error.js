class ApiError extends Error{
    
   constructor(statusCode, message){
    super(message)//calls parent class content
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this,this.constructor)
   }
   

   static badRequest(message = "Bad request"){
     return new ApiError(400,message)
   }
   static unAuthorized(message = "Unauthorized"){
     return new ApiError(401,message)
   }
   static conflict(message = "Conflict- User already exists"){
     return new ApiError(409,message)
   }
   static forbidden(message = "Forbidden"){
     return new ApiError(412,message)
   }
   static notfound(message = "Not found"){
     return new ApiError(404,message)
   }


}

export default ApiError