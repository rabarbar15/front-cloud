import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Books } from './pages/Books'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import Payments from './pages/Payments'
import Login from './components/Login'
import Singup from './components/Signup'
import Orders from './pages/Orders'
import OrderItems from './components/OrderItems'

function App() {

  return (
  <>
    <ShoppingCartProvider>
      <Navbar />
      <Container className='mb-4'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/payments' element={<Payments />}></Route>
          <Route path='/books' element={<Books />}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Singup/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path='/orderItems/:id' element={<OrderItems/>}></Route>
        </Routes>
      </Container>
    </ShoppingCartProvider>
  </>
  )
}

export default App
