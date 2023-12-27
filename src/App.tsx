import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { RequireAuth } from './components/ProtectedRoute'
import './index.css'
import { Friends } from './views/Friends/Friends'
import { Home } from './views/Home/Home'
import { Ideas } from './views/Ideas/Ideas'
import { Login } from './views/Login/Login'
import { MyWishlist } from './views/MyWishlist/MyWishlist'
import { SignUp } from './views/SignUp/SignUp'

function App() {

  const userData = useSelector((store: any) => store.user.data);

  return (
    <div className='flex flex-col justify-between w-full h-screen'>
      {/* NavigationBar */}
      {userData.isLoggedIn && <NavBar />}
      {/* Pages */}
      <main className='grow px-8 md:px-16 lg:px-32 py-8'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          {/* <ProtectedRoute path={'/'} element={<Home />} /> */}
          <Route path="/mi-lista" element={
            <RequireAuth>
              <MyWishlist />
            </RequireAuth>
          } />
          <Route path="/sugerencia" element={
            <RequireAuth>
              <Ideas />
            </RequireAuth>
          } />
          <Route path="/amigos" element={
            <RequireAuth>
              <Friends />
            </RequireAuth>
          } />
        </Routes>
      </main>
      {/* Footer */}
      {userData.isLoggedIn && (
        <div className='bg-red-400 px-8 md:px-16 lg:px-32 py-12 z-10'>
          <h1>Soy el footer</h1>
        </div>
      )}
    </div>
  )
}

export default App