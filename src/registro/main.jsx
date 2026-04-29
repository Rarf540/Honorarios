import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RegistroPage from './RegistroPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegistroPage />
  </StrictMode>,
)
