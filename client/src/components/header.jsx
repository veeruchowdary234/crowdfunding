import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import {useSelector} from 'react-redux'
function Header() {
  const path=useLocation().pathname;
  const {currentUser}=useSelector(state=>state.user)
  console.log(currentUser)
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className=' self-center whitespace-normal text-sm sm:text-xl font-semibold '>
        <span className=' px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-400 to-red-500 text-white'>Veeru's</span>
         Blog
        </Link>
        <form>
          <TextInput type='text' placeholder='search' rightIcon={AiOutlineSearch} className='hidden lg:inline text-white'/>
        </form>
        <Button className='w-12 h-10 lg:hidden ' color='green' pill>
          <AiOutlineSearch />
        </Button>
        <div className=' flex gap-2 md:order-2'>
           <Button className='w-12 h-10 hidden sm:inline' color='gray'><FaMoon/></Button>
           {currentUser ? (
            <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.photo} rounded/>}>
            <Dropdown.Header>
              <span className='block text-sm'>{currentUser.username}</span>
              <Dropdown.Divider/>
              <span className='block text-sm'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item>Signout</Dropdown.Item>
            </Dropdown>
           ):(
            <Link to='/signin'>
             <Button gradientDuoTone='purpleToBlue'>SignIn</Button>
          </Link>
           )}
          
          <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path==='/'}>
              <Link to="/">
                Home
              </Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/about'}>
              <Link to="/about">
                about
              </Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/projects'}>
              <Link to="/projects">
                Projects
              </Link>
            </Navbar.Link>
          </Navbar.Collapse>
    </Navbar>
    
  )
}

export default Header