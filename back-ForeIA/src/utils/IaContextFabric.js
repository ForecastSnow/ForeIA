import { authJWTUtil } from "./AuthJWTUtil.js";
import { ForeIaMicroservice } from "./ForeIaMicroserviceEndpoints.js";

class IaContextFabric {

    constructor() {
        this.Endpoints = ForeIaMicroservice
    }

    newContext(chat) {

        if (chat.messages.length == 0) {

            return null

        }

        let context = "";

        if (chat.messageCheckpoint.checkpoint != null) {

            context = `este es el resumen previo de la conversacion: ${chat.messageCheckpoint.checkpoint} y estos los ultimos mensajes: `

        }

        let count

        if (chat.messages.length > 19) {
            count = chat.messages.length - 19
        } else { count = 0 }

        for (let index = count; index < chat.messages.length; index++) {

            let sender

            if (index % 2 === 0) { sender = "USUARIO" } else { sender = "IA" }

            context += `${sender} DICE: ${chat.messages[index].message} \n`

        }

        return { context: context }

    }


    async newContextWhitCheckpoint(chat) {

        try {

            if (chat.messages.length == 0) {

                return null

            }

            let conversation = "";

            for (let index = 0; index < chat.messages.length; index++) {

                let sender

                if (index % 2 === 0) { sender = "USUARIO" } else { sender = "IA" }

                conversation += `${sender} DICE: ${chat.messages[index].message} \n`

            }

            const body = { conversation: conversation }

            const checkpoint = await fetch(this.Endpoints.chatResume, {

                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Cookie": `Authorization=${authJWTUtil.foreIANucleMicroserviceTokens()}`
                }, body: JSON.stringify(body)

            }).then((response) => response.json())

            let context = `este es el resumen previo de la conversacion: ${checkpoint.response} y estos los ultimos mensajes: `;

            let count

            if ((chat.messages.length - 19) > 19) {
                count = chat.messages.length - 19
            } else { count = 0 }

            for (let index = count; index < chat.messages.length; index++) {

                let sender

                if (index % 2 === 0) { sender = "USUARIO" } else { sender = "IA" }

                context += `${sender} DICE: ${chat.messages[index].message} \n`

            }

            return {
                context,
                checkpoint: checkpoint.response
            }

        } catch (error) {

            error.status = 503

            throw error

        }

    }

}

export const iaContextFabric = new IaContextFabric()