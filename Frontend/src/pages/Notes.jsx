import React, {useState,useEffect, useContext, useDebugValue, isValidElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TextareaAutosize from "react-textarea-autosize";
import { GlobalContext } from '../context/GlobalContextProvider';
import axios from 'axios';
import {toast} from 'react-toastify'
const Notes = () => {
  const id=useParams().id;
  const{backendUrl,token}=useContext(GlobalContext);
  const[isEdit,setIsEdit]=useState(false);
  const[bookInfo,setBookInfo]=useState(false)
  const[ebook,setEBook]=useState('');
  const lineHeight = 24;
  const maxHeight = 500;
  const maxRows = Math.floor(maxHeight / lineHeight);
  const navigate=useNavigate();

  const uploadEbook=async()=>{
    try{
      const fd=new FormData();
      fd.append('id',id);
      ebook&&fd.append('pdf',ebook);
      const response=await axios.post(`${backendUrl}/api/notes/upload-ebook`,fd,{headers:{token}});
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }
 
  const fetchBookInfo=async()=>{
    try{
      const response=await axios.post(`${backendUrl}/api/notes/get-notes`,{id})
      if(response.data.success){
        setBookInfo(response.data.message);
      }
    }catch(err){
      console.log(err.message);
    }
  }

  const saveNotes=async(e)=>{
    setIsEdit(false)
    try{
      const response=await axios.post(`${backendUrl}/api/notes/save-notes`,{id,notes:bookInfo.notes})
      if(response.data.success){
        fetchBookInfo();
        toast.success("Notes updated")
      }else{
        throw new Error("Failed to update notes")
      }
    }catch(err){
      console.log(err);
      toast.error(err.message||"Something went wrong")
    }
  }

  useEffect(()=>{
    fetchBookInfo()
  },[])

  useEffect(()=>{
    if(ebook){
      uploadEbook();
    }
  },[ebook])
  return bookInfo&&(
    <div>
      <div className='flex gap-7 sm:gap-15   mt-4'>
        <div className='w-[120px] sm:w-[160px]'><img src={bookInfo.image} alt="book cover" className='w-full' /></div>
        <div className='w-[75%] sm:w-[60%] '>
          <h1 className=' text-xl sm:text-3xl font-bold leading-5'>{bookInfo.title}</h1>
          <h2 className='text-lg sm:text-2xl sm:mt-4 font-semibold'>{bookInfo.author}</h2>
          <p className='text-md sm:text-lg sm:mt-2'>Last read: {bookInfo.lastRead}</p>
          
            {isEdit?
            <div className='my-4'>
              <label htmlFor="pdf" className='text-xs sm:text-sm sm:mt-3 bg-amber-200 px-2 py-1 rounded-sm text-black cursor-pointer'>Update Ebook</label>
              <input id="pdf" type="file" hidden onChange={(e)=>{setEBook(e.target.files[0])}}/>
            </div>
            :
            <div className='my-4'>
              {bookInfo.ebook.length==0?<div><label htmlFor="pdf" className='text-xs sm:text-sm sm:mt-3 bg-amber-200 px-2 py-1 rounded-sm text-black cursor-pointer'>Upload Ebook</label>
                <input id="pdf" type="file" hidden onChange={(e)=>{setEBook(e.target.files[0])}}/></div>:
                <button className='text-xs sm:text-sm sm:mt-2 bg-amber-200 px-2 py-1 rounded-sm text-black cursor-pointer' onClick={()=>{navigate(`/extracted-text/${id}`)}}>View Ebook</button>
              }
              
            </div>
            }
          
          
        </div>
      </div>
        <div>
          {!isEdit? <TextareaAutosize
          readOnly
            className='bg-[#FAFAFA] text-[#2D2D2D] p-4 resize-none outline-none sm:p-8 border-[1px] border-[#ccc] rounded-xl text-[20px] shadow-md mt-[4vw] w-full max-h-[530px] overflow-y-auto'
             // Minimum height
            maxRows={maxRows} // Maximum height before scrollbar
            value={bookInfo.notes}
            
          />
          :
          <TextareaAutosize
            className="bg-[#FAFAFA] text-[#2D2D2D] p-8 border-[1px]  rounded-xl text-[20px] shadow-md outline-2 outline-secondary border-[#ffffff] w-full mt-[4vw] overflow-y-auto resize-none"
            // Minimum height
            maxRows={maxRows} // Maximum height before scrollbar
            value={bookInfo.notes}
            onChange={(e) =>{setBookInfo(prev=>({...prev,notes:e.target.value}))}}
          />}
        </div>
        {!isEdit?<button className='bg-secondary w-20 text-center py-1 rounded-sm hover:bg-secondaryhover text-[#FAFAFA] mt-4' onClick={()=>{setIsEdit(true)}}>Edit</button>
        :<button className='bg-secondary w-20 text-center py-1 rounded-sm hover:bg-secondaryhover text-[#FAFAFA] mt-4' onClick={saveNotes}>Save</button>}
        

      </div>
  )
}

export default Notes

