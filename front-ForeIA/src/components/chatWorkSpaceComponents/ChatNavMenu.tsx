import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { ChatsContext } from '../contexts/ChatContext';
import { dataFetcher } from '../../services/DataFetcher';
import ConversationButton from './navbarComponents/ConversationButton';
import Icon, { Brand } from '../ui/Icon';

type Props = { chatSelected?: string; setChatSelected: (id: string | undefined) => void; isOpen: boolean; onClose: () => void; loading: boolean; error: boolean; onRetry: () => void; onHelp: () => void; preview: boolean };

function ChatNavMenu({ chatSelected, setChatSelected, isOpen, onClose, loading, error, onRetry, onHelp, preview }: Props) {
  const chats = useContext(ChatsContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const username = localStorage.getItem('username') || 'Invitado';
  const logout = useMutation({
    mutationFn: () => dataFetcher.logout(),
    onSuccess: () => {
      localStorage.removeItem('username'); localStorage.removeItem('idUser');
      queryClient.clear(); navigate('/login');
    },
  });
  const filtered = [...chats].reverse().filter(chat => chat.index.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  return <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
    <div className="sidebar-brand"><Link to={preview ? '/preview' : '/app'} onClick={() => setChatSelected(undefined)} className="brand"><Brand /><span>ForeIA</span></Link><button className="icon-button sidebar-close" onClick={onClose} aria-label="Cerrar menú"><Icon name="close" /></button></div>
    <div className="sidebar-main">
      <button className="new-chat-button" onClick={() => { setSearch(''); setChatSelected(undefined); }}><Icon name="plus" size={18} /><span>Nueva conversación</span><Icon name="pen" size={15} /></button>
      <label className="search-field"><Icon name="search" size={17} /><input aria-label="Buscar conversaciones" placeholder="Buscar conversaciones" value={search} onChange={event => setSearch(event.target.value)} />{search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Limpiar búsqueda"><Icon name="close" size={13} /></button>}</label>
      <div className="history-heading"><span>TUS CONVERSACIONES</span><span>{chats.length.toString().padStart(2, '0')}</span></div>
      <nav className="conversation-history" aria-label="Historial de conversaciones">
        {loading ? <div className="history-loading" role="status"><span /><span /><span /><p>Cargando conversaciones…</p></div> : error ? <div className="history-empty"><Icon name="refresh" size={22} /><p>No pudimos cargar el historial.</p><button className="text-button" onClick={onRetry}>Reintentar</button></div> : filtered.length ? <ul>{filtered.map(chat => <ConversationButton key={chat._id} chat={chat} active={chat._id === chatSelected} onSelect={setChatSelected} />)}</ul> : <div className="history-empty"><span className="empty-history-icon"><Icon name={search ? 'search' : 'chat'} size={21} /></span><strong>{search ? 'Sin coincidencias' : 'Sin conversaciones'}</strong><p>{search ? 'Prueba con otras palabras.' : 'Inicia un chat para verlo en el historial.'}</p></div>}
      </nav>
    </div>
    <div className="sidebar-bottom"><button className="sidebar-help" onClick={onHelp}><Icon name="help" size={18} /><span>Ayuda</span><Icon name="arrow" size={15} /></button><div className="profile-row"><span className="profile-avatar">{username.charAt(0).toUpperCase()}</span><div className="profile-details"><strong>{username}</strong><span>{preview ? 'Vista previa' : 'Sesión iniciada'}</span></div>{preview || !localStorage.getItem('idUser') ? <Link className="icon-button" to="/login" aria-label="Iniciar sesión" title="Iniciar sesión"><Icon name="logout" size={18} /></Link> : <button className="icon-button" onClick={() => logout.mutate()} disabled={logout.isPending} aria-label="Cerrar sesión" title="Cerrar sesión"><Icon name="logout" size={18} /></button>}</div>{logout.isError && <p className="sidebar-error" role="alert">No se pudo cerrar la sesión. Inténtalo otra vez.</p>}</div>
  </aside>;
}

export default ChatNavMenu;
