// Just 404 error.
const notFoundError = (req, res, next) => {
    return res.render('global/404')
    return res.status(404).json({
        statusCode : 404,
        message : 'Not found error',
        success : false,
    });
};


// All errors
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message  || 'Interval server error.';
    return res.json({
        statusCode,
        message,
        success : false,
    });
};


module.exports = {
    notFoundError,
    errorHandler,
}