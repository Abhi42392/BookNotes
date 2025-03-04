import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='flex justify-between gap-[3vw] my-[4vw]'>
      <div className='sm:w-[60%]'>
        <h1 className='font-secondary font-bold text-primary text-3xl'>About Us</h1>
        <div className='my-4'>
          <h2 className='font-semibold text-xl'>Welcome to book Notes</h2>
          <p>At Book Notes, we believe that every book holds a wealth of knowledge, 
            and capturing key insights should be effortless. Our platform is designed for book lovers, students,
            and professionals who want to save, organize, and revisit important takeaways from their reading journey.</p>
        </div>
        <div>
          <h2 className='font-semibold text-xl'>Our Mission</h2>
          <p>
            Our mission is to make reading more productive by allowing users to extract, store, and share notes from books, PDFs, and eBooks in a simple and intuitive way. 
            We aim to enhance the reading experience by providing a seamless way to highlight and remember key concepts.
          </p>
        </div>
      </div>
      <div className='hidden sm:block w-[350px] lg:w-[400px]'>
        <img src={assets.about_bg} alt="About image" className='w-full'/>
      </div>
    </div>
  )
}

export default About