//We create a middleware validate that takes a DTO class (not instance).
//That class has a validate() method and a schema. they are static

//Inside this  middleware, we call DtoClass.validate() which uses its own schema to validate data.
import ApiError from '../utils/api-error.js'
const validate = (DtoClass)=>{
    return (req,res,next)=>{
       const {errors,value} = DtoClass.validate(req.body)
       if(errors){
        throw ApiError.badRequest(errors.join("; "))
       }
       req.body = value
       next()
    }
} 

export default validate