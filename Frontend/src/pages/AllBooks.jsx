import React from 'react'
import { allBooks } from '../assets/assets'
import { assets } from '../assets/assets'
import Book from '../components/Book'

const AllBooks = () => {
  const createBook=(props)=>{
    return <Book key={props.id} id={props.id} title={props.title} author={props.author} 
    image={props.image} />
  }
  return (
    <div className='my-8'>
      <div className='rounded-full shadow-md border border-gray-300 sm:w-[65%] lg:w-[45%] px-6 py-2 flex justify-between items-center cursor-pointer mx-auto my-8'>
        <input type="text" placeholder='Search any book...' className='text-[#808080] outline-none border-none w-[70%]'/>
        <img src={assets.search} alt="search icon" className='w-6' />
      </div>
      <div className='my-[5vw] grid max-xs:grid-cols-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12'>
        {allBooks.map(createBook)}
      </div>
    </div>
  )
}

export default AllBooks