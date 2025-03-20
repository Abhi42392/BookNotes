import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import AllBooks from "./pages/AllBooks"
import Profile from "./pages/Profile"
import Notes from "./pages/Notes"
import Login from "./pages/Login"
import AddBook from "./pages/AddBook"
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import ExtractedText from './pages/ExtractedText'
import { GlobalContext } from './context/GlobalContextProvider'
const App = () => {
  const{loading}=useContext(GlobalContext)
  if(loading){
    return <div className='min-h-screen flex justify-center items-center'><div className='h-16 w-16 rounded-full border-8 border-t-primary border-white animate-spin '></div></div>
  }
  return (
    <div className='flex flex-col min-h-screen'>
      <ToastContainer />
      <NavBar />
      <div className='mx-[4vw] sm:mx-[10vw] flex-1'>
        <Routes>
          <Route path={'/'} element={<Home />}/>
          <Route path={'/contact'} element={<Contact />}/>
          <Route path={'/about'} element={<About />}/>
          <Route path={'/my-books'} element={<AllBooks />}/>
          <Route path={'/my-books/notes/:id'} element={<Notes />}/>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/add-book'} element={<AddBook/>}/>
          <Route path={'/extracted-text/:id'} element={<ExtractedText/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App