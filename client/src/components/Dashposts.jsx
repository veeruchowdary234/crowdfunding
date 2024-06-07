import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Modal, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Dashposts() {
  const { currentUser } = useSelector(state => state.user);
  const [userposts, setUserposts] = useState([]);
  const [showmore, setShowmore] = useState(true);
  const [showmodal, setShowmodal] = useState(false);
  const [postidtodelete, setPostidtodelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await response.json();
        if (response.ok) {
          setUserposts(data.posts);
          if (!data.posts.length) {
            setShowmore(false);
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

  
      fetchPosts();
  }, [currentUser._id]);

  const handleshowmore = async () => {
    const start = userposts.length;
    try {
      const response = await fetch(`/api/post/getposts?userId=${currentUser._id}&startindex=${start}`);
      const data = await response.json();
      if (response.ok) {
        setUserposts(prev => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handledeletepost = async () => {
    try {
      const response = await fetch(`/api/post/deletepost/${postidtodelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        console.log('Error deleting post:', response);
      }
      if (response.ok) {
        setUserposts(prev => prev.filter(post => post._id !== postidtodelete));
        setShowmodal(false);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <Table hovarable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>ProjectImage</Table.HeadCell>
          <Table.HeadCell>Project Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>Approval Status</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {userposts.map(post => (
            <Table.Row key={post._id}>
              <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                <Link to={`/post/${post.slug}`}>
                  <img src={post.image} alt={post.title} className='w-20 h-20 object-cover bg-gray-400' />
                </Link>
              </Table.Cell>
              <Table.Cell><Link to={`/post/${post.slug}`}>{post.title}</Link></Table.Cell>
              <Table.Cell>{post.category}</Table.Cell>
              <Table.Cell>
                <button onClick={() => {
                  setShowmodal(true);
                  setPostidtodelete(post._id);
                }}>Delete</button>
              </Table.Cell>
              <Table.Cell><Link className='text-teal-500' to={`/update-post/${post._id}`}><span>Edit</span></Link></Table.Cell>
              <Table.Cell>{post.approved ? 'Approved' : 'Pending'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {showmore && <button onClick={handleshowmore} className='bg-blue-500 text-white px-4 py-2 rounded-md self-center mx-auto w-full'>Show More</button>}
      
      <Modal show={showmodal} onClose={() => setShowmodal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div>
            <HiOutlineExclamationCircle className='h-14 w-14 dark:text-gray-200 mx-auto' />
            <h3 className='text-lg font-bold dark:text-gray-400'>Are you sure you want to delete post?</h3>
            <div className="flex justify-between">
              <Button gradientDuoTone='redToYellow' onClick={handledeletepost}>Delete</Button>
              <Button gradientDuoTone='pinkToBlue' onClick={() => setShowmodal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashposts;

6

8