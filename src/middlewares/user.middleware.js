import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

// token verify
export const verifyToken = asyncHandler(async (req, _, next) => {
    const token = req.cookies.accessToken

    if(!token){
        throw new ApiError(401, "You are not authorised");
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            throw new ApiError(401, "Token is invalid");
        }

        req.user = user
        next()
    })
  });

//   user verify
  export const verifyUser = asyncHandler(async (req, _, next) => {
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.role === 'admin'){
            next()
        } else {
            throw new ApiError(401, "You are not authenticated");
        }
    })
  })

//   admin verify
  export const verifyAdmin = asyncHandler(async (req, _, next) => {
    verifyToken(req,res,next, ()=>{
        if(req.user.role === 'admin'){
            next()
        } else {
            throw new ApiError(401, "You are not authorize");
        }
    })
  })