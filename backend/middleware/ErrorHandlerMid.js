import ErrorHandler from "../utils/ErrorHandler.js"

export const ErrorHandlerMid = (err,req,res,next) => {
    err.message = err.message || "Undefined Error Message"
    err.statusCode = err.statusCode || 500


    if(err.name === "CastError"){
        err.message = `Resource not correct in path ${err.path}`
        err = new ErrorHandler(err.message,400)
    }

    //JSON web token error
    if(err.name == "JsonWebTokenError"){
        err.message = `Please send valid Token`
        err = new ErrorHandler(err.message,400)
    }

    //JSON web token Expired error
    if(err.name == "TokenExpiredError"){
        err.message = `Web token Expired`
        err = new ErrorHandler(err.message,400)
    }

    //Send Error
    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })

}