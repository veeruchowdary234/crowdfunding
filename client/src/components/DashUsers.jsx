import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table,Modal,Button, TableBody} from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
function DashUsers() 
{
  const { currentUser } = useSelector(state => state.user)
  const [users,setUsers] = useState([])
  const [showmore,setShowmore]=useState(true)
  const [showmodal, setShowmodal] = useState(false)
  const [useridtodelete, setUseridtodelete] = useState('')
  console.log(users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/user/getusers`)
        const data = await response.json()
        console.log(data)
        if (response.ok) {
          setUsers(data.users)
          if(data.users.length<9)
          {
            setShowmore(false)
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    if(currentUser.isAdmin) 
    {
      fetchUsers();
    }
  }, [currentUser._id])
 console.log(useridtodelete)
  const handleshowmore = async () => 
  {
    const start = users.length
    try 
    {
      const response = await fetch(`/api/user/getusers?startindex=${start}`)
      const data = await response.json()
      if(response.ok)
      {
        setUsers((prev)=>[...prev,...data.users])
        if(data.users.length<9)
        {
          setShowmore(false)
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }
 const handledeleteuser = async () =>
 {
    try 
    {
      
      const response = await fetch(`/api/user/admindeluser/${useridtodelete}`,{
        method:'DELETE',
      })
      if(!response.ok)
      {
        console.log('Error deleting post:',response)
      }
      if(response.ok)
      {
        setUsers((prev)=>prev.filter(user=>user._id!==useridtodelete))
        setShowmodal(false)
      }
    } catch (error) 
    {
      console.error('Error deleting post:', error)
    }
 }
  return (
    <div>
      {currentUser.isAdmin ? (
        <>
        <Table hovarable className='shadow-md '>
          <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User Imgae</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
            {users.map(user=> (
              <TableBody className='divide-y' key={user._id}>
              <Table.Row >
                <Table.Cell>{new Date().toLocaleDateString()}</Table.Cell>
                <Table.Cell><Link to={`/post/}`}><img src={user.photo} className=' w-20 h-20 object-cover bg-gray-400 rounded-full'/></Link></Table.Cell>
                <Table.Cell><Link to={`/post/`}>{user.username}</Link></Table.Cell>
                <Table.Cell><Link to={`/post/`}>{user.email}</Link></Table.Cell>
                <Table.Cell>{user.isAdmin ? 'Yes' : 'No'}</Table.Cell>
                <Table.Cell><button cursor-pointer onClick={()=>{setShowmodal(true);setUseridtodelete(user._id)}} className=' text-red-700' >Delete</button></Table.Cell>
              </Table.Row>
              </TableBody>
            ))}
      
        </Table>
        {showmore && <button onClick={handleshowmore} className='bg-blue-500 text-white px-4 py-2 rounded-md self-center mx-auto w-full'>Show More</button>}
        </>
      ):(
        <p>No posts found</p>
      )}
      <Modal show={showmodal} onClose={()=>setShowmodal(false)} popup size='md'>
    <Modal.Header/>
    <Modal.Body>
      <div>
        <HiOutlineExclamationCircle className='h-14 w-14 dark:text-gray-200 mx-auto '/>
      <h3 className='text-lg font-bold dark:text-gray-400' >Are you sure you want to delete user?</h3>
      <div className="flex justify-between">
        <Button gradientDuoTone='redToYellow' onClick={handledeleteuser}>Delete</Button>
        <Button gradientDuoTone='pinkToBlue' onClick={()=>setShowmodal(false)}>Cancel</Button>
      </div>
      </div>
    </Modal.Body>
    </Modal>
    </div>
  )
}
export default DashUsers
