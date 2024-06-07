import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeslice';
import { signout,signoutFailure,signoutSuccess} from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
function Header() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user);
  const navigate=useNavigate();
  const handlesignout=async (e)=>
    {
      e.preventDefault();
      dispatch(signout())
      try {
        const res=await fetch(`/api/user/signout`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          }
        })
        const data=await res.json();
        if(res.ok)
        {
         dispatch(signoutSuccess(data))
          console.log(data)
        }
      } catch (error) {
      dispatch(signoutFailure(error.message))
        console.log(error)
      }
    }

  return (
    <Navbar className="border-b-2 bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-400 to-red-500 text-white rounded">
            CrowdFunding
          </span>
          Platform
        </Link>

        <Button className="w-12 h-10 lg:hidden" color="green" pill>
          <AiOutlineSearch />
        </Button>

        <div className="flex gap-3 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" onClick={() => dispatch(toggleTheme())}>
            <FaMoon />
          </Button>
           
          {currentUser && path !='/signin' ?  (
            <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.photo} rounded />}>
              <Dropdown.Header>
                <span className="block text-sm font-semibold">{currentUser.username}</span>
                <span className="block text-xs">{currentUser.email}</span>
              </Dropdown.Header>

              {currentUser.isAdmin ? (
                <Link to="/admindashboard?tab=adminprofile">
                  <Dropdown.Item>Admin's Dashboard</Dropdown.Item>
                </Link>
              ) : (
                <Link to="/dashboard?tab=profile">
                  <Dropdown.Item>User's Dashboard</Dropdown.Item>
                </Link>
              )}
                
                <Dropdown.Item ><div onClick={handlesignout}>SignOut</div></Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/signin">
              <Button gradientDuoTone="purpleToBlue">Sign In</Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === '/'} className=' text-lg'>
            <Link to="/">Home</Link>
          </Navbar.Link>

          <Navbar.Link active={path === '/about'} className='text-lg'>
            <Link to="/about">About</Link>
          </Navbar.Link>

          <Navbar.Link active={path === '/dashboard?tab=posts'} className='text-lg'>
            <Link to="/dashboard?tab=posts">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
