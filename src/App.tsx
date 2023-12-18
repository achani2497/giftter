import { useState } from 'react'
// import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { Home } from './components/Home/Home'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p> */}
      <nav className='w-full bg-red-400'>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
