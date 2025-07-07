import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
        <div className='  bg-white bg-cover bg-center h-screen flex flex-col justify-between'>
          <img src="image.png" alt="home page background" />

           <div className='bg-white pb-4 py-4 px-4 justify-center'>
            <h2 className='text-2xl font-bold'>Get started with Uber</h2>
            <Link to='/login'>
            <button className='bg-black font-medium text-white py-2 px-4 mt-5 rounded-lg w-full text-lg'>Continue</button>
            </Link>
           </div>
        </div>
    </div>
  )
} 
  