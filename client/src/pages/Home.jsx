
import React,{useState} from 'react';
import { Button } from 'flowbite-react';
import { useEffect } from 'react';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = React.useState([])
    useEffect(() => {
      const fetchposts=async()=>
      {
        const response = await fetch('api/post/getposts?limit=3')
        const data = await response.json()
        setPosts(data.posts)
      }
      fetchposts();
    }, [])
    const handleclick = () =>{
      navigate('/dashboard?tab=posts')
    }
  return (
    <>
    <div className=" min-h-screen py-32">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Crowdfunding Platform</h1>
        <h2 className="text-lg mb-8">Empowering Dreams, Transforming Lives Of People.The one stop platform to get funded for your projects</h2>
       <button className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-full shadow-lg font-semibold transition duration-300 ease-in-out" onClick={handleclick}>Explore Projects</button>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8'>
          {
            posts && posts.length>0 && (
              <div className="">
                <h2 className='text-5xl p-10 font-semibold text-center'>Recent projects</h2>
                <div className='flex gap-8'>
                { posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                  ))
                }
                </div>
              </div>
            )
          }
        </div>
    </div>
    </>
  );
}

export default Home;


