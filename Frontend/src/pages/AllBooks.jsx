import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import Book from '../components/Book'
import { GlobalContext } from '../context/GlobalContextProvider'
import { useNavigate } from 'react-router-dom'
const AllBooks = () => {
  const{token,allBooks}=useContext(GlobalContext)
  const{loading}=useContext(GlobalContext)
  const[searchBook,setSearchBook]=useState('')
  const navigate=useNavigate();
  const createBook=(props)=>{
    return <Book key={props._id} id={props._id} title={props.title} author={props.author} 
    image={props.image} />
  }
  if(!token){
    return <div className='flex justify-center items-center w-full'><p className='text-2xl translate-y-48'><span className='text-primary font-semibold underline cursor-pointer' onClick={()=>{navigate('/login')}}>Login</span> to view Books</p></div>
  }
  if(loading){
    return <div className='min-h-screen flex justify-center items-center'><div className='h-15 w-15 rounded border-8 border-t-primary border-white animate-spin '></div></div>
  }
  return (
    <div className='my-8'>
      <div className='rounded-full shadow-md border border-gray-300 sm:w-[65%] lg:w-[45%] px-6 py-2 flex justify-between items-center cursor-pointer mx-auto my-8'>
        <input type="text" placeholder='Search any book...' className='text-[#808080] outline-none border-none w-[70%]' value={searchBook} onChange={(e)=>{setSearchBook(e.target.value)}}/>
        <img src={assets.search} alt="search icon" className='w-6'/>
      </div>
      <div className='my-[5vw] grid max-xs:grid-cols-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12'>
        {allBooks.filter((book)=>{
          if(searchBook===''||book.title===searchBook||book.title.includes(searchBook)){
            return true;
          }
        }).map(createBook)}
      </div>
    </div>
  )
}

export default AllBooks