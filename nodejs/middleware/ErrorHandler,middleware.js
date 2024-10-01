export const errorHandler = (req,res,next) =>{
    console.error(err.stack)
    if (!res.headersSent) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong error Handdler!',
            error: err.message
        });
    } else {
        next(err);
    }
}
export const asyncErrorHandler = (asyncFunc) => {
    return (req, res, next) => {
        Promise.resolve(asyncFunc(req, res, next))
            .catch(next); // Passes any errors to the Express error handler
    };
};