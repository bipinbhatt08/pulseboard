import Joi from "joi"

class BaseDto{
   static schema =  Joi.object({})
   
   static validate(data){
        const {error,value} = this.schema.validate(data,{
            abortEarly: false,
            stripUnknown: true //if you get any field that i did not tell you about..eliminate those
        })
        if(error){
            const errors = error.details.map((d)=>d.message)
            return {errors,value:null}
        }
        return {value,errors:null}
    }

}
export default BaseDto