import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Hero = () => {
   const navigate=useNavigate(); 
  return (
    <div className='bg-primary rounded-lg relative p-[min(6%,48px)] mb-[16vw] sm:mb-[8vw]'>
        <div className='w-[100%] md:w-[80%] lg:w-[60%]'>
            <h1 className='text-3xl sm:text-4xl leading-10  lg:text-5xl md:leading-15 font-bold text-white font-primary'>Unlock Knowledge,<br /> One Note at a Time!</h1>
            <p className="py-4 font-secondary font-thin text-white max-sm:text-sm">Transform the way you learn and retain information with structured book notes.
             Capture key insights, summarize important ideas, and revisit your favorite books effortlessly.
            Whether you're a student, a lifelong learner, or a book lover, our platform helps you 
            organize and access your notes anytime, anywhere.</p>
            <button onClick={()=>{navigate("/add-book")}} className='bg-secondary px-4 py-1 sm:px-8  sm:py-2 font-secondary rounded-full text-white cursor-pointer max-sm:text-xs'>Start making notes</button>
        </div>
        <img src={assets.hero_bg} alt="hero background" className='w-[320px] h-[90%] hidden lg:block absolute right-10 bottom-3'/>

    </div>
  )
}

export default Hero