import React, { useRef, useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { allBooks } from '../assets/assets';
import TextareaAutosize from "react-textarea-autosize";
const Notes = () => {
  const id=useParams().id;
  const[isEdit,setIsEdit]=useState(false);
  const[bookInfo,setBookInfo]=useState(allBooks[id])
  const lineHeight = 24; // Adjust based on textarea styling (default ~24px per line)
  const maxHeight = 530; // Max height in pixels
  const maxRows = Math.floor(maxHeight / lineHeight);
  return (
    <div>
      <div className='flex gap-5 mt-4'>
        <div className='w-[120px] sm:w-[160px]'><img src={bookInfo.image} alt="book cover" className='w-full' /></div>
        <div className='w-[75%] sm:w-[60%] '>
          <h1 className=' text-xl sm:text-3xl font-bold leading-5'>{bookInfo.title}</h1>
          <h2 className='text-lg sm:text-2xl sm:mt-3 font-semibold'>{bookInfo.author}</h2>
          <p className='text-md sm:text-lg sm:mt-1'>Last read: {bookInfo.lastRead}</p>
          {bookInfo.ebook.length==0&&<button className='text-xs sm:text-sm sm:mt-2 bg-amber-200 px-2 py-1 rounded-sm text-black'>Upload Ebook</button>}
        </div>
      </div>
        <div>
          {!isEdit? <TextareaAutosize
          readOnly
            className='bg-[#FAFAFA] text-[#2D2D2D] p-4 resize-none outline-none sm:p-8 border-[1px] border-[#ccc] rounded-xl text-[20px] shadow-md mt-[4vw] w-full max-h-[530px] overflow-y-auto'
            minRows={3} // Minimum height
            maxRows={maxRows} // Maximum height before scrollbar
            value={bookInfo.notes}
            
          />
          :
          <TextareaAutosize
            className="bg-[#FAFAFA] text-[#2D2D2D] p-8 border-[1px] border-[#ccc] rounded-xl text-[20px] shadow-md focus:outline-2 focus:outline-secondary focus:border-[#ffffff] w-full mt-[4vw] overflow-y-auto resize-none"
            minRows={3} // Minimum height
            maxRows={maxRows} // Maximum height before scrollbar
            value={bookInfo.notes}
            onChange={(e) =>{setBookInfo(prev=>({...prev,notes:e.target.value}))}}
          />}
        </div>
        {!isEdit?<button className='bg-secondary w-20 text-center py-1 rounded-sm hover:bg-secondaryhover text-[#FAFAFA] mt-4' onClick={()=>{setIsEdit(true)}}>Edit</button>
        :<button className='bg-secondary w-20 text-center py-1 rounded-sm hover:bg-secondaryhover text-[#FAFAFA] mt-4' onClick={()=>{setIsEdit(false)}}>Save</button>}
        {bookInfo.ebook.length!=0&&<button className='text-xs sm:text-sm sm:mt-2 bg-amber-200 px-2 py-1 rounded-sm text-black'>Upload Ebook</button>}

      </div>
  )
}

export default Notes

