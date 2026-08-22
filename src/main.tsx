import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { TRPCProvider } from "@/providers/trpc"
import { LangProvider } from "./i18n"
import { BasketProvider } from "@/providers/basket"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TRPCProvider>
        <LangProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </LangProvider>
      </TRPCProvider>
    </BrowserRouter>
  </StrictMode>,
)
