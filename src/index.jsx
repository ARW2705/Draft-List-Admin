import React from 'react'
import * as ReactDOMClient from 'react-dom/client'

import Router from './routing/Router/Router'

import './styles/style.css'

import reportWebVitals from './reportWebVitals'


const container = document.querySelector('#app-root')
const root = ReactDOMClient.createRoot(container)
// Removing scrollbar obliterates scroll event on window, but can be caught on root element
// Catch the event and reemit the scrollable container as detail
container.addEventListener('scroll', event => {
  window.dispatchEvent(new CustomEvent('scroll', { detail: container }))
})

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)

// Comment preceding render and uncomment the following to test without strict mode
// root.render(<Router />)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
