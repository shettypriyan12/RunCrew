export const success = (res, status , message= "" , data=[])=>{
    return res.status(status).json({
        data : data,
        message : message,
        success : true
    });
}

export const failure = ( res , status , message)=>{
    return res.status(status).json({
        message : message,
        success:false,  
    });
}