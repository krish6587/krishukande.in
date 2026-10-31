import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NotFoundPage } from './components/NotFoundPage.tsx'

const path = window.location.pathname;
const isValidPath = path === '/' || path === '/index.html';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isValidPath ? <App /> : <NotFoundPage />}
  </StrictMode>,
)
