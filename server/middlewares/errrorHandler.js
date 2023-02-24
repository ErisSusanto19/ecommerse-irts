const errorHandler = (error, req, res, next) => {
    let code = 500;
    let message = "Internal server error";

    switch (error.name) {

        case "SequelizeValidationError":
        case "InputRequired":
        case "InvalidInputLogin":
            code = 400;
            message = error.errors[0].message;
            break;

        case "InvalidToken":
        case "JsonWebTokenError":
            code = 401;
            message = "Invalid token";
            break;

        case "DataNotFound":
            code = 404;
            message = "Data not found";
            break;

        case "Forbidden":
            code = 403;
            message = "You are unathorized";
            break;

        case "DuplicateFavorite":
            code = 400;
            message = "This book is already on your favorites list";
            break;
        
        default:
            break;

    }

    res.status(code).json({message})
}

module.exports = errorHandler