import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SharedClimbing } from './components/SharedClimbing';
import './index.css';
import './depth.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="depth-site" data-tone="mint"><SharedClimbing /></main>
  </StrictMode>,
);
