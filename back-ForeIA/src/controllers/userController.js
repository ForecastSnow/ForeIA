import express from "express";
import { userService } from "../services/userService.js";
import { DTOValidatorUtil } from "../utils/DTOValidator.js";


export const userController = express.Router();


userController.post("/createUser", async (req, res, next) => {

    try {

        const payload = await DTOValidatorUtil.userDTO(req.body)

        await userService.createUser(payload)

        res.status(201).send({ message: "ok" })

    } catch (error) {

        next(error)

    }

})