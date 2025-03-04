import React from 'react'
import { assets } from '../assets/assets'

const Features = () => {
  return (
    <div className='my-[16vw] sm:my-[8vw] flex flex-col gap-7 sm:flex-row justify-between items-stretch sm:gap-5'>
        <div className='bg-[#FAFAFA] p-5 sm:w-[370px] shadow-md rounded-md min-h-full'>
            <img src={assets.feature_icon1} alt="icon 1" className='w-8' />
            <h1 className='text-primary font-semibold font-primary pt-3 pb-1'>Smart Note-Taking</h1>
            <p className='font-secondary text-[#2D2D2D]'>Effortlessly jot down key insights from books. 
                Our intuitive note editorhelps you structure and
             refine your thoughts as you read.
            </p>
        </div>
        <div className='bg-[#FAFAFA] p-5   sm:w-[370px] shadow-md rounded-md min-h-full'>
            <img src={assets.feature_icon2} alt="icon 2" className='w-8' />
            <h1 className='text-primary font-semibold font-primary pt-3 pb-1'>Organised Notes</h1>
            <p className='font-secondary text-[#2D2D2D]'>Easily sort, tag, and categorize your notes by book, topic, or custom labels. 
                No more searching—find what you need instantly!
            </p>
        </div>
        <div className='bg-[#FAFAFA] p-5  sm:w-[370px] shadow-md rounded-md min-h-full'>
            <img src={assets.feature_icon3} alt="icon 3" className='w-8' />
            <h1 className='text-primary font-semibold font-primary pt-3 pb-1'> Extract Highlights</h1>
            <p className='font-secondary text-[#2D2D2D]'>Automatically import and save highlighted text from eBooks, 
                making it easier to keep track of important passages without manual copying.
            </p>
        </div>
    </div>
  )
}

export default Features