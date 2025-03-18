import React,{useState,useEffect,useContext} from 'react'
import { GlobalContext } from '../context/GlobalContextProvider';
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios';
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
    useEffect(()=>{
        fetchBookInfo()
    },[])
    return bookInfo&&(
        <div>
          <div className='flex gap-7 sm:gap-15   mt-4'>
            <div className='w-[120px] sm:w-[160px]'><img src={bookInfo.image} alt="book cover" className='w-full' /></div>
            <div className='w-[75%] sm:w-[60%] '>
              <h1 className=' text-xl sm:text-3xl font-bold leading-5'>{bookInfo.title}</h1>
              <h2 className='text-lg sm:text-2xl sm:mt-4 font-semibold'>{bookInfo.author}</h2>
              <p className='text-md sm:text-lg sm:mt-2'>Last read: {bookInfo.lastRead}</p>
              <button className='text-xs sm:text-sm sm:mt-2 bg-amber-200 px-2 py-1 rounded-sm text-black cursor-pointer' onClick={()=>{navigate(-1)}}>View Notes</button>
            </div>
          </div>
          
        </div>
      )
}

export default ExtractedText