
const apiURL = import.meta.env.VITE_APIURL

export const apiEndpoints = Object.freeze({

    serverCheck: apiURL.concat("/api/status"),

    createUser: apiURL.concat("/api/createUser"),

    login: apiURL.concat("/api/login"),

    logout: apiURL.concat("/api/logout"),

    chatCreate: apiURL.concat("/api/chat/create"),

    chatMessage: apiURL.concat("/api/chat/message/"),

    chatGetAll: apiURL.concat("/api/chat/getall"),

    chatGetById: apiURL.concat("/api/chat/"),

    chatDisableById: apiURL.concat("/api/chat/")

})