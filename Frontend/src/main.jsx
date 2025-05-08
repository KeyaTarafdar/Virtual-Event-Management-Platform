import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextWrapper, CompanyContextWrapper } from './context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CompanyContextWrapper>
      <UserContextWrapper>
        <App />
      </UserContextWrapper>
    </CompanyContextWrapper>
  </React.StrictMode>,
)
