import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-primary flex flex-wrap justify-between font-secondary text-white py-4 px-[4vw] sm:px-[10vw] sm:py-8 gap-4 mt-[6vw] sm:mt-[3vw]'>
        <div className='max-w-[40vw]'>
            <h1 className='font-bold text-md sm:text-xl'>BookNotes</h1>
            <p className='font-light text-xs sm:text-sm pt-1 sm:pt-2'>© 2025 BookNotes. All rights reserved.
                Your go-to platform for organized book notes and seamless
             reading insights.</p>
        </div>
            <div>
                <h1 className='font-bold text-md sm:text-xl'>Need help?</h1>
                <p className='font-light text-xs sm:text-sm pt-1 sm:pt-2'>help.booknotes@gmail.com<br />
                    401 103 111 109<br />
                +91 7013242334</p>
            </div>
            <div>
                <h1 className='font-bold text-md sm:text-xl'>Reach us</h1>
                <div className='flex gap-3 items-center pt-1 sm:pt-2'>
                    <img src={assets.instagram} alt="instagram" className='w-4 sm:w-6'/>
                    <img src={assets.x} alt="x" className='w-4 sm:w-6'/>
                    <img src={assets.facebook} alt="facebook" className='w-4 sm:w-6'/>
                </div>
            </div>
    </div>
  )
}

export default Footer