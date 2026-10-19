import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Chat from './chatWorkSpaceComponents/Chat';
import ChatNavMenu from './chatWorkSpaceComponents/ChatNavMenu';
import { dataFetcher } from '../services/DataFetcher';
import { ChatsContext, type Conversation } from './contexts/ChatContext';
import Icon from './ui/Icon';

export type Connection = 'online' | 'offline' | 'checking' | 'preview';

function ChatWorkspace({ connection, onReconnect, preview = false }: { connection: Connection; onReconnect: () => void; preview?: boolean }) {
  const [chatSelected, setChatSelected] = useState<string>();
  const [newChatVersion, setNewChatVersion] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const helpDialog = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(() => localStorage.getItem('foreia-theme') !== 'light');
  const { data: chats = [], isPending, isError, refetch } = useQuery<Conversation[]>({
    queryKey: ['getsChats'], queryFn: () => dataFetcher.getChats(),
    enabled: !preview && connection === 'online', retry: false,
  });
  const currentChat = chats.find(chat => chat._id === chatSelected);
  useEffect(() => { localStorage.setItem('foreia-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => {
    if (!helpOpen) return;
    const previousFocus = document.activeElement;
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const controls = helpDialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', trapFocus);
    return () => { document.removeEventListener('keydown', trapFocus); if (previousFocus instanceof HTMLElement) previousFocus.focus(); };
  }, [helpOpen]);
  useEffect(() => {
    if (!helpOpen && !sidebarOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setHelpOpen(false); setSidebarOpen(false); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [helpOpen, sidebarOpen]);
  function selectChat(id: string | undefined) {
    if (id === undefined) setNewChatVersion(value => value + 1);
    setChatSelected(id); setSidebarOpen(false);
  }

  return <div className={`workspace ${dark ? 'theme-dark' : ''}`}>
    <ChatsContext.Provider value={preview ? [] : chats}>
      {sidebarOpen && <button className="sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú" />}
      <ChatNavMenu chatSelected={chatSelected} setChatSelected={selectChat} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} loading={isPending && connection === 'online'} error={isError} onRetry={() => { void refetch(); }} onHelp={() => setHelpOpen(true)} preview={preview} />
      <main className="main-workspace">
        <header className="workspace-header">
          <div className="header-breadcrumb"><button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><Icon name="panel" /></button><span className="breadcrumb-home">Espacio de trabajo</span><Icon name="chevron" size={13} /><span className="breadcrumb-current">{currentChat?.index || 'Nueva conversación'}</span></div>
          <div className="header-actions"><span className={`connection-state ${connection}`}><i />{connection === 'online' ? 'Sistema disponible' : connection === 'preview' ? 'Vista previa' : connection === 'checking' ? 'Conectando' : 'Sin conexión'}</span><span className="header-divider" /><button className="icon-button" onClick={() => setHelpOpen(true)} aria-label="Ayuda y consejos" title="Ayuda y consejos"><Icon name="help" size={19} /></button><button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? 'Activar tema claro' : 'Activar tema oscuro'} title={dark ? 'Tema claro' : 'Tema oscuro'}><Icon name={dark ? 'sun' : 'moon'} size={19} /></button></div>
        </header>
        <Chat key={chatSelected ?? `new-${newChatVersion}`} chatSelected={chatSelected} setChatSelected={setChatSelected} preview={preview} connection={connection} onReconnect={onReconnect} />
      </main>
    </ChatsContext.Provider>
    {helpOpen && <div className="modal-backdrop" onClick={() => setHelpOpen(false)}><section ref={helpDialog} className="help-dialog" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={event => event.stopPropagation()}><button autoFocus className="icon-button dialog-close" onClick={() => setHelpOpen(false)} aria-label="Cerrar ayuda"><Icon name="close" /></button><h2 id="help-title">Ayuda</h2><div className="help-tip"><Icon name="chat" /><div><strong>Enviar mensajes</strong><p>Enter envía el mensaje. Shift + Enter añade un salto de línea.</p></div></div><div className="help-tip"><Icon name="search" /><div><strong>Historial de conversaciones</strong><p>Busca y retoma tus chats desde la barra lateral. Usa «Nueva conversación» para empezar otro.</p></div></div><p className="help-note">El sistema es lento porque es una demo con recursos limitados. Las respuestas pueden tardar y contener errores.</p>{preview && <Link className="primary-button" to="/login">Iniciar sesión <Icon name="arrow" size={17} /></Link>}</section></div>}
  </div>;
}

export default ChatWorkspace;
