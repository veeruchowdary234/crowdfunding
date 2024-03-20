import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {Alert, Button, Label, TextInput} from "flowbite-react"
import {signin, signinSuccess, signinFailure} from "../redux/user/userSlice" ;
import {useDispatch,useSelector} from "react-redux"
import Oauth from '../components/Oauth';
function Signin() 
{
  const dispatch=useDispatch();
  const {loading,error:errormessage}=useSelector((state)=>state.user)
  const [formdata,setformdata]=useState({})
  const navigate=useNavigate();
  const handlechange=(e)=>
  {
    e.preventDefault()
    setformdata({...formdata,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit=async (e)=>
  {
    e.preventDefault();
    if(!formdata.email||!formdata.password)
    {
      return dispatch(signinFailure('please fill out all fields'))
    }
    try {
      dispatch(signin())
      const res=await fetch('/api/auth/signin',
      {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formdata)
      })
      const data=await res.json();
      if(data.sucess===false)
      {
        dispatch(signinFailure(data.message))
      }
      if(res.ok)
      {
        dispatch(signinSuccess(data))
        navigate('/')
      }
    } catch (error) 
    {  
      dispatch(signinFailure(error.message))
    } 
  }
  console.log(formdata)
  return (
   <div className=' min-h-screen mt-20 px-5'>
   <div className='flex p-3 gap-5 max-w-3xl mx-auto flex-col'>
    <div className=''>
    <Link to='/' className='  font-bold dark:text-white text-3xl'>
        <span className=' px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-400 to-red-500 text-white'>Veeru's</span>
         Blog
        </Link>
        <p>You can sigin with your email and password</p>
    </div>
    <div>
    <div className='max-w-sm'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <Label value='Email'/>
          <TextInput type='email' placeholder='email' id='email' onChange={handlechange}/>
        </div>
        <div>
          <Label value='Password'/>
          <TextInput type='password' placeholder='Password' id='password' onChange={handlechange}/>
        </div>
       <Button gradientDuoTone='purpleToPink' type='submit'>SIGNIN</Button>
       <Oauth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <span>Have an Account?</span>
        <Link to='/signin' className='text-blue-500' type='submit'>Signup</Link>
        {
          errormessage&&(
            <Alert className='mt-5' color='failure'>{errormessage}</Alert>
          )
        }
      </div>
    </div>
    </div>
    </div>
   </div>
  )
}

export default Signin