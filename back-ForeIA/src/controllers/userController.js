import express from "express";
import { userService } from "../services/userService.js";
import { DTOValidatorUtil } from "../utils/DTOValidator.js";


export const userController = express.Router();


userController.post("/createUser", async (req, res, next) => {

    try {

        const payload = await DTOValidatorUtil.userDTO(req.body)

        res.status(201).send(await userService.createUser(payload))
        
    } catch (error) {

        next(error)

    }

})