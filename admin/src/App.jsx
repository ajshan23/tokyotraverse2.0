import React from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import ListProduct from './Components/ListProduct'
import Test from './Components/Test'
import AddProduct from './Components/AddProduct'
import OrderList from './Components/OrderList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
const App = () => {
  return (
    <div className='app' style={{ height: '100vh', overflow: 'hidden' }}>
      <BrowserRouter>
     <Navbar/>
     
     <div className='flex'>
       <Sidebar />
       <Routes>
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/listproduct' element={<ListProduct/>} />
        <Route path='/listorders' element={<OrderList/>} />
      </Routes>
     </div>
     
     </BrowserRouter>
    </div>
  )
}

export default App
