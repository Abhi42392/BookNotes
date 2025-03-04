import React, { useState } from 'react'

const Login = () => {
  const[currState,setCurrState]=useState("Login")
  return (
    <div className='flex justify-center my-[7vh] text-base sm:text-lg text-slate-600'>
      <div className='border-2 border-gray-300 shadow-md rounded-lg p-6 w-[400px]'>
        {currState==="Login"?<h1 className='text-2xl sm:text-3xl font-semibold text-primary'>Login</h1>:<h1 className='text-2xl sm:text-3xl font-semibold text-primary'>Create Account</h1>}
        
        <form>
          {currState!='Login'?
            <div className='my-4 w-full'>
            <input type="text"  className='outline outline-gray-300 mt-2 rounded-sm py-2 px-4 block  w-full ' placeholder='Full name' />
          </div>
          :<></>}
          <div className='my-4 w-full'>
            <input type="text"  className='outline outline-gray-300 mt-2  rounded-sm py-2 px-4 block  w-full' placeholder='Email' />
          </div>
          <div className='my-4 w-full'>
            <input type="password" className='outline outline-gray-300 mt-2  rounded-sm py-2 px-4 block  w-full' placeholder='Password' />
          </div>
          {currState==="Login"?<button className='bg-secondary hover:bg-secondaryhover text-center py-1 rounded-sm w-full text-white my-2'>Login</button>:<button className='bg-secondary hover:bg-secondaryhover text-center py-1 rounded-sm w-full text-white my-2'>Create account</button>}
          {currState==="Login"?<p className='text-center'>Dont't have an Account?<span className='text-secondary underline cursor-pointer' onClick={()=>{setCurrState("Sign up")}}>Sign up</span></p>:<p  className='text-center'>Already have an Account?<span className='text-secondary underline cursor-pointer' onClick={()=>{setCurrState("Login")}}>Login</span></p>}
        </form>
        
      </div>
    </div>
  )
}

export default Login