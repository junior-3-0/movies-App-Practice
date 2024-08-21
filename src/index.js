import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/app'

import './index.css'

const rootElement = document.getElementById('root')
const createRoot = ReactDOM.createRoot(rootElement)
createRoot.render(<App />)
