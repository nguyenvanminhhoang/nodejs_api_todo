var ErrorResponse = require("../utils/ErrorResponse");
var notify = require("./../configs/notify")

const errorHandler = (err, req, res, next) => {
    let error = {...err} // not work for err.name
    
    if (err.name === "CastError") {
        let message = notify.ERROR_CAST;
        error = new ErrorResponse(404, message);
       
    }
    res.status( error.statusCode || 500 ).json({
        success: false,
        message: error.message || "SERVER ERROR"
    });
}

module.exports = errorHandler;
