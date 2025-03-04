import React, { useState } from 'react'
import {assets} from '../assets/assets'
import {user} from '../assets/assets'
const Profile = () => {
  const[isEdit,setIsEdit]=useState(false)
  const[userInfo,setUserInfo]=useState(user)
  return (
    <div className='mt-[2vw] lg:w-[70%] mx-auto max-w-[750px]'>
      <div className='flex justify-around items-center rounded-xl shadow-md border border-gray-300 py-3 sm:py-6'>
        <img src={assets.profile_pic} alt="profile pic" className='h-10 w-10 sm:w-25 sm:h-25 rounded-full'/>
        <h1 className='text-2xl sm:text-4xl font-bold font-secondary text-primary'>{user.name}</h1>
      </div>
      <div className='flex justify-between  gap-5 sm:gap-15  max-sm:overflow-x-scroll my-7 sm:my-10'>
        <div className='min-w-[150px] w-full'>
         <p className='flex justify-center items-center  font-bold text-2xl sm:text-4xl border-2 border-primary h-[50px] sm:h-[100px] rounded-t-md'>{user.total_books}</p>
         <p className='bg-primary text-center py-1 sm:py-2 text-white rounded-b-md text-sm sm:text-base'>Total Books</p>
        </div>
        <div className='min-w-[150px] w-full'>
         <p className='flex justify-center items-center font-semibold text-lg sm:text-2xl border-2 border-primary h-[50px] sm:h-[100px] text-center rounded-t-md'>{user.last_read}</p>
         <p className='bg-primary text-center py-1 sm:py-2 text-white rounded-b-md text-sm sm:text-base'>Last read Book</p>
        </div>
        <div className='min-w-[150px] w-full'>
         <p className='flex justify-center items-center font-bold text-2xl sm:text-4xl border-2 border-primary h-[50px] sm:h-[100px] rounded-t-md'>{user.streak}</p>
         <p className='bg-primary text-center py-1 sm:py-2 text-white rounded-b-md  text-sm sm:text-base'>Streak</p>
        </div>
      </div>
      <div className='grid grid-cols-[0.5fr_1.5fr] max-w-[500px]  text-lg sm:text-xl'>
        <p>Name</p>

        {isEdit?<input type="text" value={userInfo.name} className='focus:outline-secondary focus:font-normal font-semibold' onChange={(e)=>{setUserInfo(prev=>({...prev,name:e.target.value}))}}/>
        :<p className='font-medium'>{user.name}</p>
        }

        <p className='sm:my-2'>Phone</p>
        {isEdit?<input type="text" value={userInfo.phone} className=' sm:my-2 focus:outline-secondary focus:font-normal font-semibold' onChange={(e)=>{setUserInfo(prev=>({...prev,phone:e.target.value}))}}/>
        :<p className='sm:my-2 font-medium'>{user.phone}</p>
        }
        
        <p>Email</p>
        {isEdit?<input type="text" value={userInfo.email} className='focus:outline-secondary focus:font-normal font-semibold' onChange={(e)=>{setUserInfo(prev=>({...prev,email:e.target.value}))}}/>
        :<p className='font-medium'>{user.email}</p>
        }
      </div>
      {!isEdit?<button onClick={()=>(setIsEdit(true))} className='bg-secondary py-1 w-[100px] text-[#FAFAFA] font-semibold font-secondary rounded-sm cursor-pointer mt-3'>Edit</button>:
      <button onClick={()=>(setIsEdit(false))} className='bg-secondary py-1 w-[100px] text-[#FAFAFA]  font-semibold font-secondary rounded-sm cursor-pointer mt-3'>Save</button>}
    </div>
  )
}

export default Profile