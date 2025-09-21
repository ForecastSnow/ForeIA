import express from "express";
import { DTOValidatorUtil } from "../utils/DTOValidator.js";
import { loginService } from "../services/loginService.js";


export const loginController = express.Router();


loginController.post("/login", async (req, res, next) => {

    try {

        const payload = DTOValidatorUtil.loginDTO(req.body);

        const cookie = await loginService.login(payload);

        res.status(200).cookie("token", cookie, { httpOnly: true, secure: true }).send({ message: "cookie sent" })

    } catch (error) {

        next(error)

    }

})