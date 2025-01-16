import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import List from './pages/list/List'
import Order from './pages/orders/Order'
import Add from './pages/Add/Add'
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const url="https://tomato-backend-59z2.onrender.com"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/Add' element={<Add url={url}/>}></Route>
          <Route path='/List' element={<List url={url}/>}></Route>
          <Route path='/Order' element={<Order url={url}/>}></Route>

        </Routes>
      </div>
    </div>
  )
}

export default App
