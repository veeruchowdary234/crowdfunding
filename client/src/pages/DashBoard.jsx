import React, { useState,useEffect} from 'react'
import { useLocation,} from 'react-router-dom'
import Dashsidebar from '../components/Dashsidebar'
import Dashprofile from '../components/Dashprofile'
import DashPosts from '../components/Dashposts'
import DashUsers from '../components/DashUsers'
function DashBoard() {
  const location = useLocation()
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const taburl = urlParams.get('tab')
    if(taburl){
      setTab(taburl)
    }
    console.log(taburl)
   },[location.search])
  return (
    <div className=' flex min-h-screen'>
      <div>
        {/*sidebar*/}
        <Dashsidebar/>
      </div>
      {/*profile*/}
      {tab==='profile'&&<Dashprofile/>}
      {tab==='posts'&&<DashPosts/>}
      {tab==='users'&&<DashUsers/>}
    
      </div> 

  )
}

export default DashBoard