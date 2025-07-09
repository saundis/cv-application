import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import Resume from './components/Resume.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Resume />
  </StrictMode>
);
