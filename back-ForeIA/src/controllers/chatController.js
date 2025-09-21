import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { chatService } from "../services/chatService.js";
import { DTOValidatorUtil } from "../utils/DTOValidator.js";


export const chatController = express.Router();


chatController.post("/chat/create", authMiddleware, async (req, res, next) => {

    try {

        const bodyPayload = DTOValidatorUtil.iaNewChatTextMessage({

            userId: req.session._id,

            message: req.body.message
        })

        res.status(201).send(await chatService.createChat(bodyPayload));

    } catch (error) {

        next(error)

    }

})

chatController.post("/chat/message/:chatId", authMiddleware, async (req, res, next) => {

    try {

        const payload = DTOValidatorUtil.iaTextMessage({
            userId: req.session._id,
            chatId: req.params.chatId,
            message: req.body.message
        })

        res.status(200).send(await chatService.newMessage(req.session, payload));

    } catch (error) {

        next(error)

    }



})


chatController.get("/chat/getall", authMiddleware, async (req, res) => {

    res.send(await chatService.getAllChatsByUser(req.session));

})

chatController.get("/chat/:chatId", authMiddleware, async (req, res) => {

    res.send(await chatService.findOneChatByIdAndUserId(req.session, req.params.chatId));

})

chatController.put("/chat/:chatId", authMiddleware, async (req, res) => {

    res.send(await chatService.disableChatbyid(req.session, req.params.chatId))

})









