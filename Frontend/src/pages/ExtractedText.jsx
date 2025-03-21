import React,{useState,useEffect,useContext} from 'react'
import { GlobalContext } from '../context/GlobalContextProvider';
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { assets } from '../assets/assets';
const ExtractedText = () => {
    const navigate=useNavigate();
    const{backendUrl}=useContext(GlobalContext);
    const id=useParams().id;
     const[bookInfo,setBookInfo]=useState(false)
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
      const dateFormat=()=>{
        const ms=bookInfo.lastRead;
        const date = new Date(ms);
        return date.toISOString().split("T")[0] 
      }
    useEffect(()=>{
        fetchBookInfo()
    },[])
    return bookInfo&&(
        <div>
          <div className='flex gap-7 sm:gap-15   mt-4'>
            <div className='w-[120px] sm:w-[160px]'><img src={bookInfo.image} alt="book cover" className='w-full' /></div>
            <div className='w-[75%] sm:w-[60%] '>
              <h1 className=' text-xl sm:text-3xl font-bold leading-5'>{bookInfo.title}</h1>
              <h2 className='text-lg sm:text-2xl mt-2 sm:mt-4 font-semibold'>{bookInfo.author}</h2>
              <p className='text-md sm:text-lg mt-1 sm:mt-2'>Last read: {dateFormat()}</p>
              <button className='text-xs sm:text-sm mt-2 sm:mt-4 bg-amber-200 px-3 py-2 sm:px-5 sm:py-3 rounded-sm text-black cursor-pointer' onClick={()=>{navigate(-1)}}><span className='flex gap-2 sm:gap-3 items-center'><img className="w-4 sm:w-6" src={assets.book} alt="book icon" /><p>View Notes</p></span></button>
            </div>
          </div>
          <h1 className='mt-[8vw] mb-[4vw] sm:mt-[4vw] sm:mb-[2vw] text-primary font-bold text-2xl sm:text-3xl'>Highlighted Text</h1>
          <div className='bg-[#FAFAFA] text-[#2D2D2D] px-4  resize-none outline-none sm:px-8 sm:py-4 border-[1px] border-[#ccc] rounded-xl text-sm sm:text-[20px] shadow-md  w-full max-h-[600px] overflow-y-auto spacey-4'>
            {bookInfo.ebook.map((para)=>(
              <p className='my-6'>{para.highlight}</p>
            ))}
          </div>
        </div>
      )
}

export default ExtractedText