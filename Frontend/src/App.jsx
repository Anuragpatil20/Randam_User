import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import User from './Component/User'

function App() {
  return (
    <BrowserRouter>
       <User/>
    </BrowserRouter>
  )
}

export default App