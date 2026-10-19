import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { dataFetcher } from './services/DataFetcher';
import { errorApi } from './utils/apiErrorHandler';
import Login from './components/Login';
import ChatWorkspace from './components/ChatWorkSpace';
import ErrorLayout from './components/ErrorLayout';
import './App.css';

export function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isPreview = pathname === '/preview';
  const status = useQuery({
    queryKey: ['serverStatus'], queryFn: () => dataFetcher.serverStatus(),
    enabled: !isPreview, retry: false, refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (pathname === '/app' && status.error instanceof errorApi && status.error.statusCode === 401) {
      navigate('/login', { replace: true });
    }
  }, [status.error, pathname, navigate]);
  return <Routes>
    <Route path="/" element={<Navigate to="/app" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/app" element={<ChatWorkspace key="app" connection={status.isSuccess ? 'online' : status.isError ? 'offline' : 'checking'} onReconnect={() => { void status.refetch(); }} />} />
    <Route path="/preview" element={<ChatWorkspace key="preview" preview connection="preview" onReconnect={() => navigate('/login')} />} />
    <Route path="/error" element={<ErrorLayout error={status.error} />} />
    <Route path="*" element={<Navigate to="/app" replace />} />
  </Routes>;
}

export default App;
