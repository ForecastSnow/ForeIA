import { chatModel } from "./schemas/chatSchema.js";


class ChatDAO {

    constructor() {

        this.chatModel = chatModel

    }

    async createChat(payload) {

        return await chatModel.create(payload)

    }

    async newMessagesCycle(chatId, payload) {

        return await chatModel.findByIdAndUpdate({ _id: chatId }, payload, { new: true })

    }

    async findAllChatsByUserId(userId) {

        return await chatModel.find({ userId: userId })

    }

    async findOneChatByIdAndUserId(userId, chatId) {

        return await chatModel.findOne({ _id: chatId, userId: userId })

    }

    async updateChatById(id, payload) {

        return await chatModel.findByIdAndUpdate(id, payload, { new: true })

    }

}


export const chatDAO = new ChatDAO()
