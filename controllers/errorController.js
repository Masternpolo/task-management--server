module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(statusCode).json({
        status: err.status,
        messeage: err.message
    });
};