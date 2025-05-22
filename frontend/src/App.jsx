import React from 'react'
import Navbar from './components/home/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import Logout from './components/user/Logout'
import Cart from './components/home/Cart'
import Categories from './components/admin/categories';
import Products from './components/admin/Products'
import ProductDetail from './components/admin/ProductDetail'
function App() {
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login/" element={<Login />} />
        <Route path="signup/" element={<Signup />} />
        <Route path="logout/" element={<Logout />} />
        <Route path="Cart/" element={<Cart/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:id" element={<Categories/>} />

      </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
