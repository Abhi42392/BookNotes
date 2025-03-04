import React from 'react'
import { useNavigate } from 'react-router-dom'
const Book = (props) => {
  const navigate=useNavigate();
  return (
    <div className='shadow-md rounded-sm cursor-pointer hover:scale-110 transition-transform ease' onClick={()=>{navigate(`notes/${props.id}`)}}>
      <img src={props.image} alt="Book cover" className='w-full h-full rounded-sm'/> 
    </div>
  )
}

export default Book