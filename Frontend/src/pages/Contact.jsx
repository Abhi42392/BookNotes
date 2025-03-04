import React from 'react'
import { assets } from '../assets/assets'
const Contact = () => {
  return (
    <div className='flex justify-between gap-[3vw] my-[4vw]'>
          <div className='sm:w-[60%]'>
            <h1 className='font-secondary font-bold text-primary text-3xl'>Contact Us</h1>
            <div className='my-4'>
              <h2 className='font-semibold text-xl'>We’d Love to Hear From You!</h2>
              <p>Have a question, suggestion, or feedback? Feel free to reach out! Whether you need help
                 using Book Notes, have a feature request, or just want to say hello, we're here to assist you.</p>
            </div>
            <div className='my-4'>
              <h2 className='font-semibold text-xl'>Get in Touch</h2>
              <p>
              Email: support@booknotes.com <br/> Phone: +1 (123) 456-7890 <br />Address: 123 Book Street, Knowledge City, 56789
              </p>
            </div>
            <div className='my-4'>
              <h2 className='font-semibold text-xl'>Connect With Us</h2>
              <p>
              Website: <span className='text-secondary font-semibold'>www.booknotes.com</span><br />Twitter/X: <span className='text-secondary font-semibold'>@BookNotesApp</span><br />Facebook: <span className='text-secondary font-semibold'>Book Notes Official</span><br />Instagram:<span className='text-secondary font-semibold'> @BookNotesApp</span>
              </p>
            </div>
          </div>
          <div className='hidden sm:block w-[350px] lg:w-[400px]'>
            <img src={assets.contact_bg} alt="Contact image" className='hidden sm:block w-full'/>
          </div>
      </div>
  )
}

export default Contact