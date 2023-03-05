import React from 'react'
import ReactDOM from 'react-dom/client'
import SettingsProvider from './contexts/Settings'
import { StoreProvider } from './contexts/Store'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <StoreProvider>
        <App key={Date.now()}/>
      </StoreProvider>
    </SettingsProvider>
  </React.StrictMode>
)
