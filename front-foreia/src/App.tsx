import { Routes, Route, useNavigate, type NavigateFunction } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dataFetcher } from './services/DataFetcher.ts';
import Login from './components/Login.tsx';
import './App.css';
import { errorApi } from './utils/apiErrorHandler.ts';
import { useEffect } from 'react';
import ChatWorkspace from './components/ChatWorkSpace.tsx';
import ErrorLayout from './components/ErrorLayout.tsx';


type ErrorHandler = (navigate: NavigateFunction, error: errorApi) => void;

type ErrorHandlersMap = {
  [key: number]: ErrorHandler;
  default: ErrorHandler;
};

const errorHandlers: ErrorHandlersMap = {
  302: (navigate) => {
    navigate("/login");
  },
  401: (navigate) => {
    navigate("/login");
  },

  default: (navigate, error) => {

    navigate("/error", { state: error });

  }
};

export function App() {
  const navigate = useNavigate();

  const { data: serverStatus, isError, error } = useQuery({
    queryKey: ['serverStatus'],
    queryFn: () => dataFetcher.serverStatus(),
    retry: (failureCount, error) => {
      return failureCount < 1;
    },
  });

  useEffect(() => {
    if (isError && error instanceof errorApi) {

      const handler = errorHandlers[error.statusCode] || errorHandlers.default;

      handler(navigate, error);
    } else {
      navigate("/app")
    }
  }, [isError, error, navigate]);



  return (

    <div className="AppContainer">

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<ChatWorkspace />} />

        {/* @ts-ignore */}
        <Route path="/error" element={<ErrorLayout error={error} />} />

      </Routes>

    </div>
  );
}

export default App;