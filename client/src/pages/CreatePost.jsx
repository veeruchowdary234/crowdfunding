import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getStorage } from 'firebase/storage'
import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import { app } from '../firebase'
import { ref } from 'firebase/storage'
import { uploadBytesResumable } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'
import {useNavigate} from 'react-router-dom'
function CreatePost() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null)
  const [formData, setFormData] = useState({ title: '', category: '', content: '',image: ''})
  const [publisherror, setPublishError] = useState(null)
  const handleUpload = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(error.message);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL }); 
          });
        }
      );
    } catch (error) {
      setImageUploadError(error.message);
      setImageUploadProgress(null);
    }
  };
  const handleSubmit = async (e) => {
   e.preventDefault();
   console.log(formData)
  try 
  {
    const res= await fetch('/api/post/createpost',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok) {
      setPublishError(data.message)
    }
    if(res.ok) {
      setPublishError(null)
      navigate(`/post/${data.post.slug}`);
    }

  } catch (error) {
    setPublishError(error.message)
  }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl text-center my-8 font-bold'>Project Submission</h1>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3 sm:flex-row justify-between'>
          <TextInput
            type='text'
            id='title'
            placeholder='Project Title'
            required
            className='flex-1'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData,title: e.target.value})}
          />
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData,category: e.target.value})}
          >
            <option value=''>Select Category</option>
            <option value='Technology and Innovation'>Technology and Innovation</option>
            <option value='Product Development'>Product Development</option>
            <option value='Health and Wellness'>Health and Wellness</option>
            <option value='Education and Learning'>Education and Learning</option>
            <option value='Fashion and Design'>Fashion and Design</option>
          </Select>
        </div>
        <div className='flex gap-4 justify-between items-center border-4 border-gray-400 border-dotted p-3 px-10'>
          <FileInput id='image' accept='image/*' required onChange={(e) => { setFile(e.target.files[0]) }} />
          <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleUpload}>Upload Image</Button>
        </div>
        {imageUploadProgress && <p>Upload Progress: {imageUploadProgress}%</p>}
        {imageUploadError && <p>Error: {imageUploadError}</p>}
        <ReactQuill
          theme='snow'
          placeholder='Write your project description and funding goal here...'
          required
         className='h-72 mb-12'
          value={formData.content}
          onChange={(value) => setFormData({ ...formData,content:value})}
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' className='w-full'>Submit project</Button>
      </form>
    </div>
  )
}

export default CreatePost
