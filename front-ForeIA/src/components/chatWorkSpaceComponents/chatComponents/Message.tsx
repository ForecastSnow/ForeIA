import { Fragment, useState } from 'react';
import type { message } from '../Chat';
import Icon, { Brand } from '../../ui/Icon';

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : <Fragment key={i}>{part}</Fragment>);
}

function Message({ messageData }: { messageData: message }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const isUser = messageData.sender === 'user';
  const date = messageData.timestamp ? new Date(messageData.timestamp) : null;
  const time = date && !isNaN(date.getTime()) ? date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) : '';
  async function copy() {
    try { await navigator.clipboard.writeText(messageData.message); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }
  return <article className={`message ${isUser ? 'message-user' : 'message-assistant'}`}>
    {!isUser && <Brand small />}
    <div className="message-body"><div className="message-meta"><strong>{isUser ? messageData.name || 'Tú' : 'ForeIA'}</strong>{time && <time dateTime={messageData.timestamp}>{time}</time>}</div>
      <div className="message-content">{isUser ? messageData.message : messageData.message.split(/```/g).map((part, index) => index % 2 ? <pre key={index}><code>{part.replace(/^\w*\n/, '')}</code></pre> : <div key={index}>{part.split('\n').map((line, j) => /^#{1,3} /.test(line) ? <h3 key={j}>{inline(line.replace(/^#{1,3} /, ''))}</h3> : <Fragment key={j}>{inline(line)}{j < part.split('\n').length - 1 && <br />}</Fragment>)}</div>)}</div>
      {!isUser && <div className="message-actions"><button className="copy-button" onClick={() => { void copy(); }} aria-label={copied ? 'Respuesta copiada' : 'Copiar respuesta'}><Icon name={copied ? 'check' : 'copy'} size={14} />{copied ? 'Copiado' : 'Copiar respuesta'}</button>{copyError && <span role="alert">No se pudo copiar.</span>}</div>}
    </div>
  </article>;
}

export default Message;
