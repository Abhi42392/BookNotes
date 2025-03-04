import React from 'react'
import Hero from '../components/Hero'
import Quote from '../components/Quote'
import Features from '../components/Features'
const Home = () => {
  return (
    <div className='mt-2 sm:mt-8'>
      <Hero />
      <Quote />
      <Features />
    </div>
  )
}

export default Home