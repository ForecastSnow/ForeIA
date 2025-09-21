import { chatDAO } from "../DAOs/chatDAO.js";
import { iaService } from "./iaService.js";
import { iaContextFabric } from "../utils/IaContextFabric.js";


class ChatService {

    async createChat(bodyPayload) {

        try {

            const iaResponse = await iaService.message(bodyPayload.message)

            const messages = [
                {
                    message: bodyPayload.message,
                    sender: "user"
                },
                {
                    message: iaResponse.response,
                    sender: "ia"
                }

            ]

            const index = await iaService.chatNameGenerator(messages)

            const payload = {

                userId: bodyPayload.userId,

                index: index.response,

                status: "active",

                messages: messages

            }

            const newChat = await chatDAO.createChat(payload)

            return {

                iaResponse,
                newChat

            }

        } catch (error) {

            throw error

        }

    }

    async newMessage(session, payload) {

        try {

            const chat = await this.findOneChatByIdAndUserId(session, payload.chatId)

            if (chat.messages.length % 20 == 0) {

                const context = await iaContextFabric.newContextWhitCheckpoint(chat)

                const iaResponse = await iaService.message(payload.message, context.context)

                const messages = [
                    {
                        message: payload.message,
                        sender: "user",
                    },
                    {
                        message: iaResponse.response,
                        sender: "ia",
                    }
                ]

                const dbAction = { $push: { messages: { $each: messages }, }, $set: { messageCheckpoint: { checkpoint: context.checkpoint, timestamp: new Date() } } }

                const cycleResult = await chatDAO.newMessagesCycle(payload.chatId, dbAction)

                return {

                    iaResponse,

                    cycleResult

                }
            }
            else {

                const context = await iaContextFabric.newContext(chat)

                const iaResponse = await iaService.message(payload.message, context.context)

                const messages = [
                    {
                        message: payload.message,
                        sender: "user",
                    },
                    {
                        message: iaResponse.response,
                        sender: "ia",
                    }
                ]

                const dbAction = { $push: { messages: { $each: messages } } }

                const cycleResult = await chatDAO.newMessagesCycle(payload.chatId, dbAction)

                return {

                    iaResponse,
                    cycleResult

                }

            }

        } catch (error) {

            throw error

        }

    }

    async getAllChatsByUser(session) {

        const chats = await chatDAO.findAllChatsByUserId(session._id);

        return chats.filter(chat => chat.status === "active")

    }

    async findOneChatByIdAndUserId(session, chatId) {

        try {

            const chatExist = await chatDAO.findOneChatByIdAndUserId(session._id, chatId)

            if (!chatExist || chatExist.status === "disabled") {

                const error = new Error("chat does not exist")
                error.status = 400;
                throw error
            }

            return chatExist

        } catch (error) {

            throw error

        }

    }

    async disableChatbyid(session, chatId) {

        try {

            await this.findOneChatByIdAndUserId(session, chatId);

            return await chatDAO.updateChatById(chatId, { status: "disabled" })

        } catch (error) {

            throw error

        }

    }

}


export const chatService = new ChatService();