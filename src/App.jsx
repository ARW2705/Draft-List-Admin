import React from 'react'
import { Outlet } from 'react-router-dom'

import token from './services/Token/Token'
import user from './services/User/User'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import './App.css'


function App() {
  token.init()
  user.init()

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App
