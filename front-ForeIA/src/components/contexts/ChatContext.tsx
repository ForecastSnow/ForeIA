import { createContext } from 'react';
import type { Conversation } from '../../types/chat';

export type { Conversation } from '../../types/chat';
export const ChatsContext = createContext<Conversation[]>([]);
