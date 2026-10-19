import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { dataFetcher } from '../../services/DataFetcher';
import type { Connection } from '../ChatWorkSpace';
import Icon, { Brand, type IconName } from '../ui/Icon';
import Message from './chatComponents/Message';
import type { ChatData } from '../../types/chat';

export type { ChatMessage as message } from '../../types/chat';
const suggestions: { title: string; description: string; icon: IconName; prompt: string }[] = [
  { title: 'Generar ideas', description: 'Opciones para un proyecto.', icon: 'bulb', prompt: 'Quiero explorar una idea nueva. Ayúdame a darle forma con preguntas y propuestas creativas.' },
  { title: 'Redactar un texto', description: 'Ajusta el tono y la estructura.', icon: 'pen', prompt: 'Ayúdame a escribir un texto claro. Primero pregúntame a quién va dirigido y qué quiero comunicar.' },
  { title: 'Revisar código', description: 'Analiza un error o una función.', icon: 'code', prompt: 'Necesito ayuda con un problema de programación. Te voy a compartir el contexto y el código para que lo analicemos paso a paso.' },
  { title: 'Explicar un tema', description: 'Resuelve dudas paso a paso.', icon: 'book', prompt: 'Quiero entender un tema. Pregúntame cuál y explícamelo con ejemplos sencillos.' },
];

function Chat({ chatSelected, setChatSelected, preview, connection, onReconnect }: { chatSelected?: string; setChatSelected: (id: string | undefined) => void; preview: boolean; connection: Connection; onReconnect: () => void }) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState('');
  const [pendingText, setPendingText] = useState('');
  const [notice, setNotice] = useState('');
  const textarea = useRef<HTMLTextAreaElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const chat = useQuery<ChatData>({
    queryKey: ['chatById', chatSelected],
    queryFn: () => dataFetcher.getChatById(chatSelected!),
    enabled: !!chatSelected && !preview && connection === 'online', retry: false,
  });
  const send = useMutation({
    mutationFn: async (text: string) => {
      if (chatSelected) { await dataFetcher.sendNewMessage({ message: text, chatSelected }); return null; }
      return dataFetcher.createChat({ message: text });
    },
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ['getsChats'] });
      if (result?.newChat) {
        queryClient.setQueryData(['chatById', result.newChat._id], result.newChat);
        if (mounted.current) setChatSelected(result.newChat._id);
      } else {
        void queryClient.invalidateQueries({ queryKey: ['chatById', chatSelected] });
      }
      if (mounted.current) setPendingText('');
    },
    onError: (_error, text) => {
      if (!mounted.current) return;
      setDraft(text); setPendingText('');
      setNotice('No pudimos enviar tu mensaje. Lo guardamos aquí para que puedas intentarlo de nuevo.');
    },
  });
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [chat.data?.messages.length, pendingText]);
  useEffect(() => {
    if (!textarea.current) return;
    textarea.current.style.height = 'auto';
    textarea.current.style.height = `${Math.min(textarea.current.scrollHeight, 180)}px`;
  }, [draft]);

  function submit() {
    const text = draft.trim();
    if (!text || send.isPending) return;
    if (preview) { setNotice('Estás en la vista previa. Inicia sesión para conversar con ForeIA.'); return; }
    if (connection !== 'online') { setNotice('El servidor no está disponible. Puedes conservar tu mensaje y reintentar la conexión.'); return; }
    setNotice(''); setPendingText(text); setDraft(''); send.mutate(text);
  }
  const hasConversation = !!chatSelected || !!pendingText;
  return <div className={`chat-space ${hasConversation ? 'chat-started' : ''}`}>
    <div className="chat-scroll">
      {!hasConversation ? <section className="welcome-screen">
        <h1>¿En qué puedo ayudarte?</h1>
        <p className="welcome-description">Escribe un mensaje o elige una sugerencia para empezar.</p>
        <div className="suggestion-grid">{suggestions.map(suggestion => <button key={suggestion.title} className="suggestion-card" onClick={() => { setDraft(suggestion.prompt); setNotice(''); textarea.current?.focus(); }}><span className="suggestion-icon"><Icon name={suggestion.icon} size={21} /></span><Icon className="suggestion-arrow" name="arrow" size={17} /><strong>{suggestion.title}</strong><span className="suggestion-description">{suggestion.description}</span></button>)}</div>
      </section> : <section className="messages" aria-label="Conversación" aria-live="polite" aria-busy={send.isPending}>
        {chatSelected && chat.isPending && <div className="chat-loading" role="status"><Brand small /><span>Cargando tu conversación…</span></div>}
        {chat.isError && <div className="inline-notice" role="alert">No pudimos cargar esta conversación.<button onClick={() => { void chat.refetch(); }}>Reintentar</button></div>}
        {chat.data?.messages.map(item => <Message key={item._id} messageData={item} />)}
        {pendingText && <Message messageData={{ _id: 'pending', sender: 'user', message: pendingText }} />}
        {send.isPending && <div className="assistant-thinking" role="status"><Brand small /><div><strong>Generando respuesta<span className="thinking-dots"><i /><i /><i /></span></strong><p>El sistema es lento porque es una demo con recursos limitados. La respuesta puede tardar.</p></div></div>}
        <div ref={bottom} />
      </section>}
    </div>
    <div className="composer-area">
      {notice && <div className="inline-notice" role="alert"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Cerrar aviso"><Icon name="close" size={16} /></button></div>}
      <form className="composer" onSubmit={event => { event.preventDefault(); submit(); }}>
        <textarea ref={textarea} aria-label="Mensaje para ForeIA" placeholder="Escribe tu mensaje…" value={draft} rows={2} maxLength={16000} disabled={send.isPending} onChange={event => { setDraft(event.target.value); setNotice(''); }} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submit(); } }} />
        <div className="composer-toolbar"><span className="model-label"><Icon name="chat" size={15} /><strong>ForeIA</strong><span className="model-tag">Demo</span></span><div className="composer-send"><span className="keyboard-hint">{send.isPending ? 'Generando respuesta…' : 'Enter para enviar'}</span><button className="send-button" type="submit" disabled={!draft.trim() || send.isPending || (!!chatSelected && !chat.isSuccess)} aria-label="Enviar mensaje" title="Enviar mensaje"><Icon name="send" size={20} /></button></div></div>
      </form>
      <p className="composer-disclaimer">Demo con recursos limitados: las respuestas pueden tardar.</p>
      {connection === 'preview' ? <footer className="workspace-footer"><Link to="/login">Vista previa · Iniciar sesión <Icon name="arrow" size={12} /></Link></footer> : connection === 'offline' ? <footer className="workspace-footer"><button onClick={onReconnect}><i className="offline-dot" />Servidor no disponible · Reintentar <Icon name="refresh" size={12} /></button></footer> : null}
    </div>
  </div>;
}

export default Chat;
