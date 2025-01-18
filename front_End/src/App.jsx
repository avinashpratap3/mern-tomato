import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Placeorder from './pages/Placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import Loginpopup from './components/LoginPopup/Loginpopup';
import Verify from './pages/verify/Verify';
import Myorder from './pages/myorders/Myorder';

function App() {
  const [showlogin, setshowlogin] = useState(false);

  // Ensure reload happens only once
  useEffect(() => {
    const shouldReload = sessionStorage.getItem('reloaded');
    if (!shouldReload) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <>
      {showlogin ? <Loginpopup setshowlogin={setshowlogin} /> : null}
      <div className='app'>
        <Navbar setshowlogin={setshowlogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/Verify' element={<Verify />} />
          <Route path='/myorder' element={<Myorder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
