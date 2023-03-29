import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import NavBa from './components/NavBar'
import Container from 'react-bootstrap/Container';
import Loader from './components/Loader'
import { useSelector } from 'react-redux'


function App() {
   // Retrieve the loading state from the store
  const isLoading = useSelector(state => state.isLoading)
  return (
    <HashRouter>
      {/* Show the loader component if the app is loading */}
      {isLoading && <Loader />}
      <NavBa />
      <Container className='my-5'>
        <Routes>
          {/* Define routes for different pages */}
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<ProductDetail />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/purchase' element={<Purchases />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
