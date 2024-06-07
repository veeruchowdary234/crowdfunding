
import React from 'react'
import {useSelector} from 'react-redux' 
import { Outlet,Navigate } from 'react-router-dom' 
function Onlyadminprivateroute() 
{
    const {currentUser}=useSelector(state=>state.user)
    console.log(currentUser)
     return currentUser.isAdmin?<Outlet/>:<Navigate to='/signin'/>
}
export default Onlyadminprivateroute