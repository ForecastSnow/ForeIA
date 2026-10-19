import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dataFetcher } from '../services/DataFetcher';
import { errorApi } from '../utils/apiErrorHandler';
import Icon, { Brand } from './ui/Icon';

const guestMode = import.meta.env.VITE_GUEST_MODE === 'true';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [notice, setNotice] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const auth = useMutation({
    mutationFn: (credentials: { email: string; plainPassword: string }) => dataFetcher.login(credentials),
    onSuccess: async (data) => {
      if (data.username && data.idUser) { localStorage.setItem('username', data.username); localStorage.setItem('idUser', data.idUser); }
      queryClient.removeQueries({ queryKey: ['getsChats'] });
      queryClient.removeQueries({ queryKey: ['chatById'] });
      await queryClient.resetQueries({ queryKey: ['serverStatus'] }); navigate('/app');
    },
    onError: (error) => setNotice(error instanceof errorApi && error.statusCode === 401 ? 'El email o la contraseña no son correctos.' : 'No pudimos conectar con el servidor. Inténtalo de nuevo en un momento.'),
  });
  const registration = useMutation({
    mutationFn: (payload: { username: string; email: string; plainPassword: string }) => dataFetcher.createUser(payload),
    onSuccess: () => { setIsLogin(true); setNotice(''); setSuccess('Tu cuenta está lista. Ya puedes iniciar sesión.'); },
    onError: (error) => setNotice(error instanceof errorApi && error.statusCode === 409 ? 'Este email ya tiene una cuenta asociada.' : 'No pudimos crear la cuenta. Inténtalo otra vez.'),
  });
  const pending = auth.isPending || registration.isPending;
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setNotice(''); setSuccess('');
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get('email')).trim();
    const plainPassword = String(fields.get('password'));
    if (isLogin) auth.mutate({ email, plainPassword });
    else if (plainPassword !== fields.get('confirmPassword')) setNotice('Las contraseñas deben coincidir.');
    else registration.mutate({ username: String(fields.get('username')).trim(), email, plainPassword });
  }

  return <div className="auth-page">
    <main className="auth-main"><Link className="auth-preview" to="/preview">Ver interfaz <Icon name="arrow" size={16} /></Link><section className="auth-form-section"><Link to="/preview" className="brand auth-brand"><Brand /><span>ForeIA</span></Link><h2>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2><p className="auth-description">{isLogin ? 'Accede a tus conversaciones.' : 'Completa los datos para registrarte.'}</p>
      {notice && <p className="auth-notice" role="alert">{notice}</p>}{success && <p className="auth-success" role="status"><Icon name="check" size={17} />{success}</p>}
      <form key={isLogin ? 'login' : 'register'} className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && <label>Nombre de usuario<input name="username" type="text" autoComplete="username" placeholder="¿Cómo te llamas?" required minLength={4} maxLength={15} disabled={pending} /></label>}
        <label>Email<input name="email" type="email" autoComplete="email" placeholder="tu@email.com" required disabled={pending} /></label>
        <label htmlFor="password">Contraseña<input id="password" name="password" type="password" autoComplete={isLogin ? 'current-password' : 'new-password'} placeholder="Al menos 5 caracteres" required minLength={5} disabled={pending} /></label>
        {!isLogin && <label>Repetir contraseña<input name="confirmPassword" type="password" autoComplete="new-password" placeholder="Una vez más" required minLength={5} disabled={pending} /></label>}
        <button className="primary-button" type="submit" disabled={pending}>{pending ? 'Procesando…' : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}<Icon name="arrow" size={18} /></button>
      </form>
      {isLogin && guestMode && <><div className="auth-or"><span />o<span /></div><button className="guest-button" disabled={pending} onClick={() => { setNotice(''); auth.mutate({ email: 'INVITADO@gmail.com', plainPassword: '12345' }); }}><Icon name="compass" size={18} />Continuar como invitado</button></>}
      <p className="auth-switch">{isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'} <button type="button" disabled={pending} onClick={() => { setIsLogin(!isLogin); setNotice(''); setSuccess(''); }}>{isLogin ? 'Registrarse' : 'Iniciar sesión'}<Icon name="chevron" size={13} /></button></p>
      <p className="auth-footnote">Demo con recursos limitados. Las respuestas pueden tardar.</p>
    </section></main>
  </div>;
}

export default Login;
