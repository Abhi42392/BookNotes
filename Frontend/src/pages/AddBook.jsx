import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContextProvider';
import axios from 'axios'
import {toast} from 'react-toastify'
const AddBook = () => {
  const[title,setTitle]=useState('');
  const[author,setAuthor]=useState('');
  const{backendUrl,token}=useContext(GlobalContext)
  const addNotes=async()=>{
    try{
      const response=await axios.post(`${backendUrl}/api/notes/add-notes`,{title,author},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        setTitle('');
        setAuthor('');
      }else{
        toast.error(response.data.message);
      }
    }catch(err){
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className='mt-[8vh] sm:mt-[10vh] flex justify-center'>
      <div className='w-[500px] border-2 rounded-md p-4 sm:p-8 border-gray-300 shadow-md'>
        <h1 className='font-primary text-primary text-2xl font-bold p'>Add Book</h1>
        <div>
          <form action={addNotes} className='flex flex-col '>
            <div className='flex flex-col my-2 sm:my-3'>
              <label htmlFor="title" className='font-secondary font-medium text-lg'>Title</label>
              <input type="text" placeholder='Enter book name' className='mt-1 outline outline-gray-300 rounded-xs px-3 py-1 sm:px-6 sm:py-2 w-full' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            <label htmlFor="title" className='font-secondary font-medium text-lg'>Author</label>
            <input type="text" placeholder='Enter author name' className='mt-1 outline outline-gray-300 rounded-xs  px-3 py-1 sm:px-6  w-full'  value={author} onChange={(e)=>{setAuthor(e.target.value)}}/>
            <button className='bg-secondary hover:bg-secondaryhover text-[#FAFAFA] py-1 rounded-sm  mt-3 sm:mt-5'>Add Book</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBook