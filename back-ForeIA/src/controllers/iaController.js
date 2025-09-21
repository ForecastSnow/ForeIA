import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { iaService } from "../services/iaService.js"


export const iaController = express.Router()


iaController.get('/status', authMiddleware, async (req, res) => {

    const response = await iaService.microserviceStatus()

    res.send(response)
})

iaController.get('/textiastatus', authMiddleware, async (req, res) => {

    const response = await iaService.iaStatus()

    res.send(response)
})