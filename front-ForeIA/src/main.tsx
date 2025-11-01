import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const basename = import.meta.env.VITE_BASE_PUBLIC_PATH ? import.meta.env.VITE_BASE_PUBLIC_PATH : "/"

createRoot(document.getElementById('root')!).render(
  <StrictMode>


    <BrowserRouter basename={basename}>

      <QueryClientProvider client={queryClient}>

        <App />

      </QueryClientProvider>


    </BrowserRouter>

  </StrictMode>
);