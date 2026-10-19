export type Conversation = { _id: string; index: string };
export type ChatMessage = { message: string; sender: string; timestamp?: string; name?: string; _id: string };
export type ChatData = Conversation & { messages: ChatMessage[] };
export type Session = { username: string; idUser: string; message: string };
