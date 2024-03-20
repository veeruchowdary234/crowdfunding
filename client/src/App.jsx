import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Signin from './pages/SignIN'
import SignUp from './pages/SignUp'
import DashBoard from './pages/DashBoard'
import About from './pages/About'
import Header from './components/header'
import Footer from './components/Footer'
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/projects' element={<Projects/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
