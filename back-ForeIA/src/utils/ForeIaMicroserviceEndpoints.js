const serverURL = process.env.FOREIANUCLEMICROSERVICE_URL;

export const ForeIaMicroservice = Object.freeze({

    serverStatus: (serverURL.concat("/api/status")),

    textIaStatus: (serverURL.concat("/api/textiastatus")),

    message: (serverURL.concat("/api/message")),

    chatNameGenerator: (serverURL.concat("/api/chatNameGenerator")),

    chatResume: (serverURL.concat("/api/chatResume")),

})