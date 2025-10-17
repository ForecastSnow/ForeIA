import express from "express";
import { DTOValidatorUtil } from "../utils/DTOValidator.js";
import { loginService } from "../services/loginService.js";


export const loginController = express.Router();


loginController.post("/login", async (req, res, next) => {

    try {

        const payload = DTOValidatorUtil.loginDTO(req.body);

        const cookieAndDate = await loginService.login(payload);

        res.status(200).cookie("token", cookieAndDate.cookie, { httpOnly: true, secure: true, sameSite: "Lax", maxAge: 1000 * 60 * 60 * 72 }).send({ message: "cookie sent", username: cookieAndDate.username, idUser: cookieAndDate.idUser })

    } catch (error) {

        next(error)

    }

})

loginController.post("/logout", async (req, res, next) => {

    try {

        res.clearCookie('token').send({ message: "cookies clear" })

    } catch (error) {

        next(error)

    }

})