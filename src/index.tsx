import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './app/App';

const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement as any);

root.render(
  <App />
);
