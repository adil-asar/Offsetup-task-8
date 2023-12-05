import React from 'react'
import {Route, Routes } from 'react-router-dom' 
import Home from './Components/Home'
import Viewall from './Components/Viewall'
import Adduser from './Components/Adduser'
import Update from './Components/Update'
const App = () => {
  return (
    <>
       <Routes>
      <Route path='/' element={<Home/>} exact />
      <Route path='/add' element={<Adduser/>} exact />
      <Route path='/view' element={<Viewall/>} exact />
      <Route path='/update' element={<Update/>} exact />
    </Routes> 
    </>
  )
}

export default App
