import React,{useState} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import { assets } from '../assets/assets';
const NavBar = () => {
  const navigate=useNavigate();
  const[token,setToken]=useState(true);
  const[showMenu,setShowMenu]=useState(false);
  return (
    <>
    <div  className='flex justify-between mx-[4vw] sm:mx-[10vw] py-3 sm:py-5 items-center navbar relative'>
      <h1 className='text-primary font-semibold text-3xl sm:text-4xl font-nav flex-1 cursor-pointer' onClick={()=>{navigate("/")}}>BookNotes</h1>
      <div className='hidden sm:flex gap-8 font-nav font-light text-lg cursor-pointer'>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        {token?<NavLink to={"/my-books"}>My Books</NavLink>:<></>}
      </div>
      {!showMenu?<img src={assets.menu} alt="menu icon" className='w-8 block sm:hidden' onClick={()=>{setShowMenu(true)}} />
      :
      <img src={assets.cross} alt="cross icon" className='w-8 block sm:hidden' onClick={()=>{setShowMenu(false)}}/>}
      {!token?<button onClick={()=>{navigate("/login")}} className='ml-4 sm:ml-8  font-nav font-light cursor-pointer bg-secondary text-white rounded-full px-4  sm:px-8 py-1 hover:bg-secondaryhover'>Login</button>:
      <img src={assets.profile_pic} className='hidden sm:block ml-8 w-8 h-8 rounded-full cursor-pointer' onClick={()=>{setShowMenu(!showMenu)}}/>}
    </div>
    <div className='relative mx-[10vw] z-20 hidden sm:block'>
      {showMenu&&
      <div className='absolute top-0 right-0 bg-stone-100 text-lg  px-8 py-4 rounded-md w-[200px] border border-gray-300'>
        <p className='cursor-pointer pb-2 text-gray-600 font-semibold hover:text-black' onClick={()=>{navigate("/profile"); setShowMenu(false)}}>My profile</p>
        <p className='cursor-pointer pb-2 text-gray-600 font-semibold hover:text-black' onClick={()=>{navigate("/my-books"); setShowMenu(false)}}>My Books</p>
        <button className='flex gap-2 items-center cursor-pointer text-gray-600 font-semibold hover:text-black'onClick={()=>{setShowMenu(false)}} ><p>Logout</p><img src={assets.logout} alt="logout" className='w-6 h-6' /></button>
      </div>}
    </div>
    {showMenu&&<div className='block sm:hidden'>
      <div className='flex flex-col fixed z-20 overflow-hidden bg-white right-0 h-screen w-full items-center gap-2 mobile-menu transition-all'>
        <NavLink onClick={()=>{setShowMenu(false)}} to={"/"}>Home</NavLink>
        <NavLink onClick={()=>{setShowMenu(false)}} to={"/about"}>About</NavLink>
        <NavLink  onClick={()=>{setShowMenu(false)}}to={"/contact"}>Contact</NavLink>
        {token&&<NavLink onClick={()=>{setShowMenu(false)}} to={"/my-books"}>My Books</NavLink>}
        {token&&<NavLink onClick={()=>{setShowMenu(false)}} to={"/profile"}>My Profile</NavLink>}
      </div>
    </div>}
    </>
  )
}

export default NavBar