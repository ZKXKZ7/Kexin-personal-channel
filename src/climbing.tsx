import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Climbing } from './components/Climbing';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main><Climbing standalone /></main>
  </StrictMode>,
);
