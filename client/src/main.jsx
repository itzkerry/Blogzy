import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './app/store/Theme-provider'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/scrollToTop'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop/>
        <App />
        <Toaster/>
      </ThemeProvider>
    </BrowserRouter>
)
