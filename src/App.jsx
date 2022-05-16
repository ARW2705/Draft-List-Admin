import React from 'react'
import { Outlet } from 'react-router-dom'

import tokenService from './services/Token/Token.service'
import userService from './services/User/User.service'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import './App.css'


function App() {
  tokenService.init()
  userService.init()

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App
