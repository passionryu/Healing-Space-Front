import { useState } from 'react'
import Header from './components/Header'
import AppRouter from './routes/router.jsx';
import Footer from './components/Footer.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />
      </div>
      
      <div>
        <AppRouter />
      </div>

      <div>
        <Footer />
      </div>
    </>
  )
}

export default App
