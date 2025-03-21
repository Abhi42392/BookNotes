import React, { useState,useContext } from 'react'
import { GlobalContext } from '../context/GlobalContextProvider'
import axios from 'axios'
import{toast} from 'react-toastify'
import { assets } from '../assets/assets'
const Profile = () => {
  const[isEdit,setIsEdit]=useState(false)
  const{userInfo,setUserInfo,token,backendUrl}=useContext(GlobalContext)
  const{allBooks}=useContext(GlobalContext)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!isEdit){
      try{
        const fd=new FormData();
        fd.append('name',userInfo.name);
        fd.append('phone',userInfo.phone);
        fd.append('email',userInfo.email);
        fd.append('image',userInfo.image);
        
        const response =await axios.post(`${backendUrl}/api/user/edit-user-info`,fd,{headers:{token}});
        if(response.data.success){
          toast.success('User data updated');
        }else{
          throw new Error('Failed to update')
        }
      }catch(err){
        console.log(err);
        toast.error(err.message||'Something went wrong')
      }
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserInfo((prev) => ({ ...prev, image: imageUrl }));
    }
  };
  return userInfo&& (
    <div className='mt-[2vw] lg:w-[70%] mx-auto max-w-[750px]'>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-around items-center rounded-xl shadow-md border border-gray-300 py-3 sm:py-6'>
          {isEdit?
          <div>
            <label htmlFor="image">
              <img className='h-10 w-10 sm:w-25 sm:h-25 rounded-full curser-pointer' src={userInfo.image} alt="profile"/>
            </label>
            <input type="file" accept='image/*' id="image"  onChange={handleImageChange} hidden/>
          </div>
          :<img src={userInfo.image} alt="profile pic" className='h-10 w-10 sm:w-25 sm:h-25 rounded-full'/>}
          <h1 className='text-2xl sm:text-4xl font-bold font-secondary text-primary'>{userInfo.name}</h1>
        </div>
        <div className='flex justify-between  gap-5 sm:gap-15  max-sm:overflow-x-scroll my-7 sm:my-10'>
          <div className='min-w-[150px] w-full'>
          <p className='flex justify-center items-center  font-bold text-2xl sm:text-4xl border-2 border-primary h-[50px] sm:h-[100px] rounded-t-md'>{allBooks.length}</p>
          <p className='bg-primary text-center py-1 sm:py-2 text-white rounded-b-md text-sm sm:text-base'>Total Books</p>
          </div>
          <div className='min-w-[150px] w-full'>
          <p className='flex justify-center items-center font-semibold text-lg sm:text-2xl border-2 border-primary h-[50px] sm:h-[100px] text-center rounded-t-md'>{userInfo.last_read}</p>
          <p className='bg-primary text-center py-1 sm:py-2 text-white rounded-b-md text-sm sm:text-base'>Last read Book</p>
          </div>
          <div className='min-w-[150px] w-full'>
          <p className='flex justify-center items-center font-bold text-2xl sm:text-4xl border-2 border-primary h-[50px] sm:h-[100px] rounded-t-md'>{userInfo.streak}</p>
          <p className='bg-primary text-center py-1 sm:py-2 text-white rounded-b-md  text-sm sm:text-base'>Streak</p>
          </div>
        </div>
        <div className='grid grid-cols-[0.5fr_1.5fr] max-w-[500px]  text-lg sm:text-xl'>
          <p>Name</p>

          {isEdit?<input type="text" value={userInfo.name} className='focus:outline-secondary focus:font-normal font-semibold' onChange={(e)=>{setUserInfo(prev=>({...prev,name:e.target.value}))}}/>
          :<p className='font-medium'>{userInfo.name}</p>
          }

          <p className='sm:my-2'>Phone</p>
          {isEdit?<input type="text" value={userInfo.phone} className=' sm:my-2 focus:outline-secondary focus:font-normal font-semibold' onChange={(e)=>{setUserInfo(prev=>({...prev,phone:e.target.value}))}}/>
          :<p className='sm:my-2 font-medium'>{userInfo.phone}</p>
          }
          
          <p>Email</p>
          {isEdit?<input type="text" value={userInfo.email} className='focus:outline-secondary focus:font-normal font-semibold' onChange={(e)=>{setUserInfo(prev=>({...prev,email:e.target.value}))}}/>
          :<p className='font-medium'>{userInfo.email}</p>
          }
        </div>
        {!isEdit?<button type="submit" onClick={()=>(setIsEdit(true))} className='bg-secondary py-1 w-[100px] text-[#FAFAFA] font-semibold font-secondary rounded-sm cursor-pointer mt-3'>Edit</button>:
        <button  onClick={()=>(setIsEdit(false))} className='bg-secondary py-1 w-[100px] text-[#FAFAFA]  font-semibold font-secondary rounded-sm cursor-pointer mt-3'>Save</button>}
      </form>
    </div>
  )
}

export default Profile
