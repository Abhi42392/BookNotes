import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const GlobalContext=createContext();
const GlobalContextProvider = ({children}) => {
  const backendUrl="https://dashboard.render.com"
  const[token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
  const[userInfo,setUserInfo]=useState({});
  const[allBooks,setAllBooks]=useState([]);
  const[loading,setLoading]=useState(false);
  const fetchUserInfo=async(token)=>{
    try{
      const response=await axios.post(`${backendUrl}/api/user/get-user-info`,{},{headers:{token}});
      if(response.data.success){
        setUserInfo(response.data.message);
      }else{
        throw new Error("Error fetching user details")
      }
    }catch(err){
      console.log(err);
    }
  }
  const fetchAllBooks=async(token)=>{
    try{
      setLoading(true);
      const response=await axios.post(`${backendUrl}/api/notes/all-notes`,{},{headers:{token}});
      if(response.data.success){
        setAllBooks(response.data.message);
        setLoading(false)
      }else{
        throw new Error("Error fetching notes")
      }
    }catch(err){
      console.log(err);
      setLoading(false)
    }
  }
  useEffect(()=>{
    if(token){
      fetchUserInfo(token);
      fetchAllBooks(token)
    }
  },[token])
  return (
   <GlobalContext.Provider value={{backendUrl,setToken,token,userInfo,setUserInfo,allBooks,setLoading,loading}}>
    {children}
   </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
