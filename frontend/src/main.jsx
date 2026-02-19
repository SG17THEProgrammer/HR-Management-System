import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import theme from "./theme";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
       <Toaster position="top-right" />
    </ThemeProvider>
  </BrowserRouter>
)
