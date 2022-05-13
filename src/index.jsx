import React from 'react'
import * as ReactDOMClient from 'react-dom/client'

import Router from './routing/Router/Router'

import './styles/style.css'

import reportWebVitals from './reportWebVitals'

const container = document.querySelector('#root')
const root = ReactDOMClient.createRoot(container)

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
