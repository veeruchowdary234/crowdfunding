import { Button, Sidebar } from 'flowbite-react'
import { HiArrowRight, HiDocumentText, HiUser , HiOutlineUsers} from 'react-icons/hi'
import React from 'react'
import { useLocation,Link} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { signout,signoutFailure,signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
function Dashsidebar() {
  const dispatch=useDispatch();
  const location = useLocation()
  const [tab,setTab] = useState('')
  const {currentUser} = useSelector(state=>state.user)
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const taburl = urlParams.get('tab')
    if(taburl){
      setTab(taburl)
    }
    console.log(taburl)
  },[location.search])
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
    
        <Sidebar>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              <Link to="/dashboard?tab=profile">
                <Sidebar.Item active={tab==='profile'}icon={HiUser} label={currentUser.isAdmin?'Admin':'user'}>
                Profile
                </Sidebar.Item>
              </Link>
              {currentUser && <Link to="/dashboard?tab=posts">
                <Sidebar.Item active={tab==='posts'}icon={HiDocumentText} as='div'>
                 Projects
                </Sidebar.Item>
              </Link>}
              {currentUser.isAdmin && <Link to="/dashboard?tab=users">
                <Sidebar.Item active={tab==='users'}icon={HiOutlineUsers} as='div'>
                 Users
                </Sidebar.Item>
              </Link>}
              {
                !currentUser.isAdmin && <Link to='/create-post'>
                <Sidebar.Item icon={HiDocumentText} as='div'>
                 Submit Project
                </Sidebar.Item>
                </Link>
              }
                <Sidebar.Item icon={HiArrowRight}>
                   <div onClick={handlesignout}>SignOut</div>
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    
  )
}

export default Dashsidebar