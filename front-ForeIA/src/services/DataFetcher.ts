import { apiEndpoints } from "../config/apiEndpoints.js";
import { apiErrorHandler } from "../utils/apiErrorHandler.js";

type ApiEndpointsType = typeof apiEndpoints;

class DataFetcher {

    private readonly apiEndpoints: ApiEndpointsType;

    constructor() {

        this.apiEndpoints = apiEndpoints

    }

    async serverStatus() {

        try {
            const response = await fetch(apiEndpoints.serverCheck, {

                method: "GET",
                credentials: "include",

            })

            await apiErrorHandler(response);

            return await response.json()

        } catch (error) {

            throw error;

        }


    }

    async login(payload: { email: string, plainPassword: string }) {

        try {

            const response = await fetch(apiEndpoints.login, {

                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    payload
                )
            })

            await apiErrorHandler(response);

            return await response.json()

        } catch (error) {

            throw error;

        }

    }

    async logout() {

        try {

            const response = await fetch(apiEndpoints.logout, {

                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            await apiErrorHandler(response);

            return await response.json()

        } catch (error) {

            throw error;

        }

    }

    async createUser(payload: { username: string, email: string, plainPassword: string }) {

        try {

            const response = await fetch(apiEndpoints.createUser, {

                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    payload
                )
            })

            await apiErrorHandler(response);

            return await response.json()

        } catch (error) {

            throw error;

        }


    }

    async getChats() {

        try {

            const response = await fetch(apiEndpoints.chatGetAll, {

                method: "GET",
                credentials: "include",

            })

            await apiErrorHandler(response);

            return await response.json()

        } catch (error) {

            throw error;

        }


    }

    async getChatById(id: string) {

        try {
            const response = await fetch((apiEndpoints.chatGetById.concat(id)), {

                method: "GET",
                credentials: "include",

            })

            await apiErrorHandler(response);

            return await response.json()

        } catch (error) {

            throw error;

        }


    }

    async sendNewMessage(payload: { message: string, chatSelected: string }) {

        try {

            const response = await fetch(apiEndpoints.chatMessage.concat(payload.chatSelected), {

                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { message: payload.message }
                )
            })

            await apiErrorHandler(response);

            return await response.json()

        } catch (error) {

            throw error;

        }


    }

    async createChat(payload: { message: string }) {

        try {

            const response = await fetch(apiEndpoints.chatCreate, {

                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { message: payload.message }
                )
            })

            await apiErrorHandler(response);

            return await response.json()

        } catch (error) {

            throw error;

        }


    }

    async disableChatById(payload: { id: string }) {

        try {

            const response = await fetch((apiEndpoints.chatDisableById).concat(payload.id), {

                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            await apiErrorHandler(response);

            return await response.json()

        } catch (error) {

            throw error;
            
        }

    }



}

export const dataFetcher = new DataFetcher();