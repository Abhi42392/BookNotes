import React from 'react'
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
const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
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
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App