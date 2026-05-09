class ApiResponse {

//methods or properties written with static belongs with the class itself not witht the object(instances) of classses

// we can directly acess like:: ApiResponse.ok()
static ok(res,message,data=null){
    return  res.status(200).json({
        success: true,
        message,
        data
    })
}
static created(res,message,data=null){
    return  res.status(201).json({
        success: true,
        message,
        data
    })
}


static noContent(res){
    return  res.status(204).send()
}

}

export default ApiResponse