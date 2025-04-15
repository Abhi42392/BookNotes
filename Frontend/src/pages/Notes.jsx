import React, {useState,useEffect, useContext, useDebugValue, isValidElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TextareaAutosize from "react-textarea-autosize";
import { GlobalContext } from '../context/GlobalContextProvider';
import axios from 'axios';
import {toast} from 'react-toastify'
import { assets } from '../assets/assets';
const Notes = () => {
  const id=useParams().id;
  const{backendUrl,token}=useContext(GlobalContext);
  const[isEdit,setIsEdit]=useState(false);
  const[bookInfo,setBookInfo]=useState(false)
  const[ebook,setEBook]=useState('');
  const[isUploaded,setIsUploaded]=useState(false);
  const[loading,setLoading]=useState(false);
  const lineHeight = 24;
  const maxHeight = 500;
  const maxRows = Math.floor(maxHeight / lineHeight);
  const navigate=useNavigate();

  const dateFormat=()=>{
    const ms=bookInfo.lastRead;
    const date = new Date(ms);
    return date.toISOString().split("T")[0] 
  }
  const lastRead=async()=>{
    try{
      const response=await axios.post(`${backendUrl}/api/user/last-read`,{bookId:id},{headers:{token}});
      if(response.data){
        console.log(response.data.message);
      }else{
        throw new Error('Error is updating last read')
      }
    }catch(err){
      console.log(err.message||'Something went wrong')
    }
  }

  const uploadEbook=async()=>{
    try{
      setLoading(true);
      const fd=new FormData();
      fd.append('id',id);
      ebook&&fd.append('pdf',ebook);
      const response=await axios.post(`${backendUrl}/api/notes/upload-ebook`,fd,{headers:{token}});
      if(response.data.success){
        setIsUploaded(true);
        setLoading(false)
      }else{
        throw new Error("Failed to upload")
      }
    }catch(err){
      console.log(err)
      setLoading(false)
      toast.error(err.message||"Something went wrong")
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
    lastRead()
  },[id])

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
          <h1 className=' text-xl sm:text-3xl  font-bold leading-5'>{bookInfo.title}</h1>
          <h2 className='text-lg sm:text-2xl mt-2 sm:mt-4 font-semibold'>{bookInfo.author}</h2>
          <p className='text-md sm:text-lg mt-1 sm:mt-2'>Last read: {dateFormat()}</p>
          
            {isEdit?
            <div className='mb-4'>
              <label htmlFor="pdf" className='mt-3 flex w-fit gap-3 items-center text-xs sm:text-sm sm:mt-3 bg-amber-200 px-3 py-2 sm:px-5 sm:py-3 rounded-sm text-black cursor-pointer'>
                {loading?<div className='w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-t-black border-amber-200 animate-spin'></div>:isUploaded?<img className="w-4 sm:w-6" src={assets.check} alt="tick icon"/>:<img className="w-4 sm:w-6" src={assets.upload}  alt="upload icon"/>}
                <p>Update Ebook</p>
              </label>
              <input id="pdf" type="file" hidden onChange={(e)=>{setEBook(e.target.files[0])}}/>
            </div>
            :
            <div className='mb-4'>
              {bookInfo.ebook.length==0?<div>
                <label htmlFor="pdf" className='mt-3 flex w-fit gap-3 items-center text-xs sm:text-sm sm:mt-3 bg-amber-200 px-3 py-2 sm:px-5 sm:py-3 rounded-sm text-black cursor-pointer'>
                  {loading?<div className='w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-t-black border-amber-200 animate-spin'></div>:isUploaded?<img className="w-4 sm:w-6" src={assets.check} alt="tick icon"/>:<img className="w-4 sm:w-6" src={assets.upload}  alt="upload icon"/>}
                  <p>Upload Ebook</p>
                </label>
                <input id="pdf" type="file" hidden onChange={(e)=>{setEBook(e.target.files[0])}}/></div>:
                <button className='text-xs sm:text-sm mt-3 bg-amber-200 px-3 py-2 sm:px-5 sm:py-3 rounded-sm text-black cursor-pointer' onClick={()=>{navigate(`/extracted-text/${id}`)}} ><span className='flex gap-3 items-center'><img className="w-4 sm:w-6" src={assets.book} alt="book icon" /><p>View Ebook</p></span></button>
              }
              
            </div>
            }
          
          
        </div>
      </div>
      <h1 className='mt-[8vw] mb-[4vw] sm:mt-[4vw] sm:mb-[2vw] text-primary font-bold text-2xl sm:text-3xl'>My Notes</h1>
        <div>
          {!isEdit? <TextareaAutosize
          readOnly
            className='bg-[#FAFAFA] text-[#2D2D2D] p-4 resize-none outline-none sm:p-8 border-[1px] border-[#ccc] rounded-xl text-sm sm:text-[20px] shadow-md S w-full max-h-[530px] overflow-y-auto'
             // Minimum height
            maxRows={maxRows} // Maximum height before scrollbar
            value={bookInfo.notes}
            
          />
          :
          <TextareaAutosize
            className="bg-[#FAFAFA] text-[#2D2D2D] p-4 sm:p-8 border-[1px]  rounded-xl text-sm sm:text-[20px] shadow-md outline-2 outline-secondary border-[#ffffff] w-full overflow-y-auto resize-none"
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

