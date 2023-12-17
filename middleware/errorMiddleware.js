const { ResponseError } = require("../error/error_Response");

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.status)
            .json({
                errors: {
                    message: err.message,
                },
            })
            .end();
    } else {
        res.status(500)
            .json({
                errors: {
                    message: "Internal server error",
                },
            })
            .end();
    }
};

module.exports = { errorMiddleware };