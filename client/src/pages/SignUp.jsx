import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {Alert, Button, Label, TextInput} from "flowbite-react"
import Oauth from '../components/Oauth'
function SignUp() {
  const [formdata,setformdata]=useState({})
  const [errormessage,seterrormessage]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handlechange=(e)=>
  {
    e.preventDefault()
    setformdata({...formdata,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit=async (e)=>
  {
    e.preventDefault();
    if(!formdata.username||!formdata.email||!formdata.password)
    {
      seterrormessage('please fill out all fields')
    }
    try {
      const res=await fetch('/api/auth/signup',
      {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formdata)
      })
      const data=await res.json();
      console.log(data)
      navigate('/')
    } catch (error) {
      
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
        <p>You can sigin up with your email and password</p>
    </div>
    <div>
    <div className='max-w-sm'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <Label value='USER NAME'/>
          <TextInput type='text' placeholder='Username' id='username' onChange={handlechange}/>
        </div>
        <div>
          <Label value='Email'/>
          <TextInput type='email' placeholder='email' id='email' onChange={handlechange}/>
        </div>
        <div>
          <Label value='Password'/>
          <TextInput type='password' placeholder='Password' id='password' onChange={handlechange}/>
        </div>
       <Button gradientDuoTone='purpleToPink' type='submit'>SIGNUP</Button>
       <Oauth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <span>Have an Account?</span>
        <Link to='/signin' className='text-blue-500' type='submit'>Signin</Link>
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

export default SignUp