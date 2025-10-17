import jwt from "jsonwebtoken";
import { authJWTUtil } from "../utils/AuthJWTUtil.js";

export const authMiddleware = (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {

            const error = new Error("you need to log in");

            error.status = 302

            throw error

        } else {

            req.session = authJWTUtil.verifyToken(token);

        }

        next()

    } catch (error) {

        error.status ? error.status : 401;

        next(error)

    }

}