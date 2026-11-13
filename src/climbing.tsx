import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SharedClimbing } from './components/SharedClimbing';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main><SharedClimbing /></main>
  </StrictMode>,
);
