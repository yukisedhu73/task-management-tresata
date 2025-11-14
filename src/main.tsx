import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#034EA2",
          color: "white",
          borderRadius: "10px",
          padding: "12px 16px",
        },
      }}
    />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)