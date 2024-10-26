import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User is not Authenticated", 400));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decode.id)

    next()
})

export default isAuthenticated;