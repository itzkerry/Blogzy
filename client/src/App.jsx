import { useState } from 'react'
import { Button } from "@/components/ui/button"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AuthPage from './pages/AuthPage'
import './App.css'
import Auth from './pages/Auth'
import AuthForm from './pages/AuthForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthPage/>
    </>
  )
}

export default App
