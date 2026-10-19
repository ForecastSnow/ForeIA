import { Link } from 'react-router-dom';
import Icon, { Brand } from './ui/Icon';

function ErrorLayout({ error }: { error: Error | null }) {
  return <main className="error-page"><Brand /><h1>No pudimos conectar.</h1><p>{error ? 'El servidor no está disponible en este momento.' : 'No hay conexión con el servidor.'}</p><Link className="primary-button" to="/app">Volver a intentar <Icon name="refresh" size={17} /></Link><Link className="text-button" to="/preview">Ver interfaz sin conexión</Link></main>;
}

export default ErrorLayout;
