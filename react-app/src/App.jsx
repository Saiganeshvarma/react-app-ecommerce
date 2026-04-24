import React from 'react'

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element = {<Home/>}/>

        </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App