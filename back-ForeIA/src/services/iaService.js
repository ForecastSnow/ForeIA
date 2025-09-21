import { ForeIaMicroservice } from "../utils/ForeIaMicroserviceEndpoints.js";
import { authJWTUtil } from "../utils/AuthJWTUtil.js";
import { DTOValidatorUtil } from "../utils/DTOValidator.js";

class IaService {

    constructor() {
        this.Endpoints = ForeIaMicroservice
    }

    async microserviceStatus() {

        try {

            const status = await fetch(this.Endpoints.serverStatus, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Cookie": `Authorization=${authJWTUtil.foreIANucleMicroserviceTokens()}`
                },

            })

            if (status.ok) {

                const response = await status.json()

                return response

            } else {
                const customError = new Error("microservice is disabled")
                customError.status = 503;
                throw customError;
            }

        } catch (error) {

            throw error

        }

    }

    async iaStatus() {

        try {

            const status = await fetch(this.Endpoints.textIaStatus, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Cookie": `Authorization=${authJWTUtil.foreIANucleMicroserviceTokens()}`
                },

            })

            if (status.ok) {

                const response = await status.json()

                return response

            } else {
                const customError = new Error("microservice is disabled")
                customError.status = 503;
                throw customError;
            }

        } catch (error) {

            throw error

        }

    }

    async message(userMessage, conversation) {

        try {

            const body = { message: userMessage }

            if (conversation != null) {
                body.conversation = conversation
            }

            const response = await fetch(this.Endpoints.message, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Cookie": `Authorization=${authJWTUtil.foreIANucleMicroserviceTokens()}`
                }, body: JSON.stringify(body)

            })

            if (response.ok) {

                return await response.json()

            } else {
                const customError = new Error("microservice is disabled")
                customError.status = 503;
                throw customError;
            }

        } catch (error) {

            throw error

        }

    }

    async chatNameGenerator(messages) {

        try {

            const body = {

                conversation: `USUARIO DICE: ${messages[0].message}. IA DICE: ${messages[1].message}`

            }

            const response = await fetch(this.Endpoints.chatNameGenerator, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Cookie": `Authorization=${authJWTUtil.foreIANucleMicroserviceTokens()}`
                }, body: JSON.stringify(body)

            })

            if (response.ok) {

                return await response.json()

            } else {
                const customError = new Error("microservice is disabled")
                customError.status = 503;
                throw customError;
            }

        } catch (error) {

            throw error

        }

    }

}


export const iaService = new IaService();