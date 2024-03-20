import React from 'react'
import {Button} from 'flowbite-react'
import {AiFillGoogleCircle} from "react-icons/ai"
import { GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth";
import {app} from "../firebase"
import {signinSuccess} from "../redux/user/userSlice"
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
function Oauth() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const auth=getAuth(app);
    const handlegoogleclick=async ()=>
    {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({prompt: 'select_account'})
            try {
                const res=await signInWithPopup(auth,provider)
                const result=await fetch('/api/auth/google',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({name:res.user.displayName,email:res.user.email,photo:res.user.photoURL})
                })
                if(result.ok)
                {
                 dispatch(signinSuccess(await result.json()))
                 navigate('/');
                }
            } catch (error) {
                console.log(error.message)
            }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handlegoogleclick}>
    <AiFillGoogleCircle className='w-6 h-2 mr-2'/>continue with Google
    </Button>
    )
}
export default Oauth