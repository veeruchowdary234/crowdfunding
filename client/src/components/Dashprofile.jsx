import {useState,useRef} from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, TextInput } from 'flowbite-react'
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import { app } from '../firebase.js'
import { updateStart, updateSuccess,updateFailure,deleteStart,deleteSuccess,deleteFailure,signout,signoutSuccess,signoutFailure} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'
import {  HiOutlineExclamationCircle } from 'react-icons/hi'
import { set } from 'mongoose'
import { Link } from 'react-router-dom'
function Dashprofile() {
  const dispatch=useDispatch()
  const {currentUser}=useSelector(state=>state.user)
  const [img,setImg]=useState(null)
  const [imgurl,setImgurl]=useState(null)
  const [imgupload,setImgupload]=useState(null)
  const [formdata,setFormdata]=useState({})
  const [showmodal,setShowmodal]=useState(false)
  const fileref=useRef(null);
  const handleimg = (e) => {
    e.preventDefault(); // Prevent default behavior of file input
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(file);
        setImgurl(reader.result); // Use reader.result to set image URL
      };
      reader.readAsDataURL(file); // Read file contents
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgupload(progress);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setFormdata({ ...formdata, photo: downloadURL });
          });
        }
      );
    }
  };
 const handlechange=(e)=>
  {
    setFormdata({...formdata,[e.target.id]:e.target.value})
  }
  const handlesubmit=async (e)=>
  {
    e.preventDefault()
    if(Object.keys(formdata).length===0)
    {
      return
    }
    try {
      dispatch(updateStart()) 
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formdata)
      })
      const data=await res.json();
      if(!res.ok)
      {
        dispatch(updateFailure(data.error))
      }
      else
      {
        dispatch(updateSuccess(data))

      }
    } catch (error) {
      dispatch(updateFailure(error))
    }
  }
  const handledelete=async (e)=>
  {
    setShowmodal(false);
    e.preventDefault();
    dispatch(deleteStart())
    try {
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data=await res.json();
      if(res.ok)
      {
        dispatch(deleteSuccess(data))
        console.log(data)
      }
    } catch (error) {
      dispatch(deleteFailure(error.message))
      console.log(error)
    }
  }
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
  console.log(formdata)
  return (
    <div className=' max-w-lg mx-auto w-full' >
    <h1 className=' my-7 text-3xl font-bold ' >Profile</h1>
    <form onSubmit={handlesubmit} className='flex flex-col gap-4' >
     <input type='file' accept='image/*'  hidden onChange={handleimg} ref={fileref}/>
     <div className='w-32 h-32 self-center cursor-pointer shawdow-md'> 
      <img src={imgurl || currentUser.photo} alt='user' className=' rounded-full w-full h-full' onClick={()=>fileref.current.click()}/>
      </div>
      <TextInput type='text' id='username' defaultValue={currentUser.username} onChange={handlechange}/>
      <TextInput type='email' id='email' defaultValue={currentUser.email} onChange={handlechange}/>
      <TextInput type='password' id='password' placeholder='password'onChange={handlechange}/>
      <Button type='submit' gradientDuoTone='purpleToBlue' outline >Update</Button>
      {!currentUser.isAdmin&&<Link to='/create-post'><Button type='button' gradientDuoTone='pinkToOrange' className='w-full'>Submit Project</Button></Link>}
    </form>
    <div className='text-red-700 mt-5 flex justify-between cursor-pointer'>
      <span onClick={()=>setShowmodal(true)}>delete account</span>
      <span onClick={handlesignout}>Sign Out</span>
    </div>
    <Modal show={showmodal} onClose={()=>setShowmodal(false)} popup size='md'>
    <Modal.Header/>
    <Modal.Body>
      <div>
        <HiOutlineExclamationCircle className='h-14 w-14 dark:text-gray-200 mx-auto '/>
      <h3 className='text-lg font-bold dark:text-gray-400' >Are you sure you want to delete your account?</h3>
      <div className="flex justify-between">
        <Button gradientDuoTone='redToYellow' onClick={handledelete}>Delete</Button>
        <Button gradientDuoTone='pinkToBlue' onClick={()=>setShowmodal(false)}>Cancel</Button>
      </div>
      </div>
    </Modal.Body>
    </Modal>
    </div>
  )
}
export default Dashprofile