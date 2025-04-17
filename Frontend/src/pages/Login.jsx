import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContextProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate=useNavigate();
  const[currState,setCurrState]=useState("Login")
  const{setToken,backendUrl}=useContext(GlobalContext);
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[loading,setLoading]=useState(false)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      if(currState==="Sign up"){
        const response=await axios.post(`${backendUrl}/api/user/register`,{name,email,password});
        if(response.data.success){
          setLoading(false)
          localStorage.setItem("token",response.data.token);
          setToken(response.data.token)
          setName("");
          setEmail("");
          setPassword("");
          navigate("/");
        }else{
          setLoading(false)
          toast.error(response.data.message)
        }
      }else{
        const response=await axios.post(`${backendUrl}/api/user/login`,{email,password});
        if(response.data.success){
          setLoading(false)
          localStorage.setItem("token",response.data.token);
          setToken(response.data.token)
          setEmail("");
          setPassword("");  
          navigate("/");
        }else{
          setLoading(false)
          toast.error(response.data.message)
        }
      }
    }catch(err){
      setLoading(false)
      console.log(err)
      toast.error(err.message||"Something went wrong")
    }   
  }
  return (
    <div className='flex justify-center my-[7vh] text-base sm:text-lg text-slate-600'>
      <div className='border-2 border-gray-300 shadow-md rounded-lg p-6 w-[400px]'>
        {currState==="Login"?<h1 className='text-2xl sm:text-3xl font-semibold text-primary'>Login</h1>:<h1 className='text-2xl sm:text-3xl font-semibold text-primary'>Create Account</h1>}
        <form onSubmit={handleSubmit}>
          {currState!='Login'?
            <div className='my-4 w-full'>
            <input type="text"  className='outline outline-gray-300 mt-2 rounded-sm py-2 px-4 block  w-full ' placeholder='Full name' onChange={(e)=>{setName(e.target.value)}} value={name} />
          </div>
          :<></>}
          <div className='my-4 w-full'>
            <input type="text"  className='outline outline-gray-300 mt-2  rounded-sm py-2 px-4 block  w-full' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email}  />
          </div>
          <div className='my-4 w-full'>
            <input type="password" className='outline outline-gray-300 mt-2  rounded-sm py-2 px-4 block  w-full' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password}  />
          </div>
          {currState==="Login"?<button className='bg-secondary hover:bg-secondaryhover text-center py-1 rounded-sm w-full text-white my-2'><span className='flex space-x-2 justify-center items-center'>{loading&&<div className='w-4 h-4 rounded-full border-t-white border-2 border-b-secondary animate-spin'></div>}<p>Login</p></span></button>
          :<button className='bg-secondary hover:bg-secondaryhover text-center py-1 rounded-sm w-full text-white my-2'><span className='flex space-x-2 justify-center items-center'>{loading&&<div className='w-4 h-4 rounded-full border-t-white border-2 border-b-secondary animate-spin'></div>}<p>Create an Account</p></span></button>}
          {currState==="Login"?<p className='text-center'>Dont't have an Account?<span className='text-secondary underline cursor-pointer' onClick={()=>{setCurrState("Sign up")}}>Sign up</span></p>:<p  className='text-center'>Already have an Account?<span className='text-secondary underline cursor-pointer' onClick={()=>{setCurrState("Login")}}>Login</span></p>}
        </form>
        
      </div>
    </div>
  )
}

export default Login