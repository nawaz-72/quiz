const ErrorHandler = require('../utils/errorhandling')

module.exports = (err,req,res,next) =>
{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Interenal Server Error"

    //Wrong id error
    if(err.name === "CastError")
    {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    //DuplicateKey Error 
    if(err.code === 11000)
    {
        const message = `This ${Object.keys(err.keyValue)} Already Exist`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}