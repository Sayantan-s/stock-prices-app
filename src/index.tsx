import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryProvider } from '@services/QueryProvider';
import { Router } from '@services/Router';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryProvider>
        <Router />
      </QueryProvider>
    </React.StrictMode>,
  );
}
