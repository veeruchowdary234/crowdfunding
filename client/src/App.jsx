import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/SignIN'
import SignUp from './pages/SignUp'
import DashBoard from './pages/DashBoard'
import About from './pages/About'
import Header from './components/header'
import Footer from './components/Footer'
import Privateroute from './components/privateroute'
import CreatePost from './pages/CreatePost'
import UpdatePost  from './pages/Updatepost'
import PostPage from './pages/PostPage'
import AdminDashBoard from './pages/AdminDashboard'
import ContributePage from './pages/ContributePage'

function App() 
{
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route  element={<Privateroute/>}>
          <Route path='/dashboard' element={<DashBoard/>}/>
        </Route>
        <Route  element={<Privateroute/>}>
          <Route path='/admindashboard' element={<AdminDashBoard/>} />
        </Route>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/update-post/:postId' element={<UpdatePost/>}/>
        <Route path='/post/:postSlug' element={<PostPage/>}/>
        <Route path='/contribute/:postId' element={<ContributePage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
