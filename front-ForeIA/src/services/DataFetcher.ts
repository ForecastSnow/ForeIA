import { apiEndpoints } from '../config/apiEndpoints';
import { apiErrorHandler } from '../utils/apiErrorHandler';
import type { ChatData, Conversation, Session } from '../types/chat';

class DataFetcher {
  private async request<T>(url: string, method = 'GET', payload?: unknown, timeout = 20_000): Promise<T> {
    const response = await fetch(url, {
      method,
      credentials: 'include',
      signal: AbortSignal.timeout(timeout),
      ...(payload === undefined ? {} : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
    });
    await apiErrorHandler(response);
    return response.json() as Promise<T>;
  }

  serverStatus() { return this.request<unknown>(apiEndpoints.serverCheck); }
  login(payload: { email: string; plainPassword: string }) { return this.request<Session>(apiEndpoints.login, 'POST', payload); }
  logout() { return this.request<{ message: string }>(apiEndpoints.logout, 'POST'); }
  createUser(payload: { username: string; email: string; plainPassword: string }) { return this.request<{ message: string }>(apiEndpoints.createUser, 'POST', payload); }
  getChats() { return this.request<Conversation[]>(apiEndpoints.chatGetAll); }
  getChatById(id: string) { return this.request<ChatData>(apiEndpoints.chatGetById + encodeURIComponent(id)); }
  sendNewMessage(payload: { message: string; chatSelected: string }) { return this.request<unknown>(apiEndpoints.chatMessage + encodeURIComponent(payload.chatSelected), 'POST', { message: payload.message }, 240_000); }
  createChat(payload: { message: string }) { return this.request<{ newChat: ChatData }>(apiEndpoints.chatCreate, 'POST', payload, 240_000); }
  disableChatById(payload: { id: string }) { return this.request<unknown>(apiEndpoints.chatDisableById + encodeURIComponent(payload.id), 'PUT'); }
}

export const dataFetcher = new DataFetcher();
