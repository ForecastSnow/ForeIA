import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataFetcher } from '../../../services/DataFetcher';
import type { Conversation } from '../../contexts/ChatContext';
import Icon from '../../ui/Icon';

export type Chat = Conversation;

function ConversationButton({ chat, active, onSelect }: { chat: Conversation; active: boolean; onSelect: (id: string | undefined) => void }) {
  const [confirm, setConfirm] = useState(false);
  const queryClient = useQueryClient();
  const remove = useMutation({
    mutationFn: () => dataFetcher.disableChatById({ id: chat._id }),
    onSuccess: () => {
      if (active) onSelect(undefined);
      void queryClient.invalidateQueries({ queryKey: ['getsChats'] });
      queryClient.removeQueries({ queryKey: ['chatById', chat._id] });
    },
  });
  return <li className={`conversation-item ${active ? 'conversation-active' : ''}`}>
    <button className="conversation-select" onClick={() => onSelect(chat._id)} aria-current={active ? 'page' : undefined} title={chat.index}><Icon name="chat" size={16} /><span>{chat.index}</span></button>
    <button className="conversation-delete" onClick={() => setConfirm(!confirm)} aria-label={`Eliminar ${chat.index}`} title="Eliminar conversación"><Icon name="trash" size={15} /></button>
    {confirm && <div className="delete-confirm"><span>¿Eliminar esta conversación?</span><div><button onClick={() => setConfirm(false)}>Cancelar</button><button className="danger-button" disabled={remove.isPending} onClick={() => remove.mutate()}>{remove.isPending ? 'Eliminando…' : 'Eliminar'}</button></div>{remove.isError && <p role="alert">No se pudo eliminar. Inténtalo de nuevo.</p>}</div>}
  </li>;
}

export default ConversationButton;
