import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import './index.css'
import { Home } from './views/Home/Home'
import { Ideas } from './views/Ideas/Ideas'
import { Login } from './views/Login/Login'
import { MyWishlist } from './views/MyWishlist/MyWishlist'

function App() {

  return (
    <div className='flex flex-col justify-between w-full h-screen'>
      {/* NavigationBar */}
      <NavBar />
      {/* Pages */}
      <main className='grow px-8 md:px-16 lg:px-32 py-8 '>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mi-lista" element={<MyWishlist />} />
          <Route path="/sugerencia" element={<Ideas />} />
        </Routes>
      </main>
      {/* Footer */}
      <div className='bg-red-400 px-8 md:px-16 lg:px-32 py-12'>
        <h1>Soy el footer</h1>
      </div>
    </div>
  )
}

export default App
