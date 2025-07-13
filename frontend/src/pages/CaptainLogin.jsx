import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CaptainLogin = () => {

 
   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")

    const navigate = useNavigate()
    const { captain , setCaptain} = useContext(CaptainDataContext)
 
    // console.log(captain);
    
   
   const validateEmail = (email) => {
     return /^\S+@\S+\.\S+$/.test(email);
   };

   const submithendeler = async (e) => {
     e.preventDefault();

     if (!validateEmail(email)) {
       toast.error('Invalid email format');
       return;
     }

    const CaptainData = {
      email : email,
      password : password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,CaptainData )
      if(response.status ===200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem("token" , data.token)
        navigate("/captain-home")
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error('Captain does not exist');
        } else if (error.response.status === 401) {
          toast.error('Incorrect password');
        } else {
          toast.error('Login failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please try again.');
      }
    }
    
    
    

    setemail("")
    setpassword("")
      
   }

  return (
    <div className="flex flex-col  justify-center p-5  ">
      <Link to="/login">

        <img
          className='   w-8  '
          src="resetImage.png" />
      </Link>
      <img
        className='  mb-10  mx-auto w-48'
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
        alt="" />

    <form onSubmit={(e) => submithendeler(e)}>
        <h3 className=' text-xl font-medium'>What's your email & password?</h3>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email"
          required
          className='mt-3 p-2 mb-3  rounded w-full px-4 border shadow-sm bg-[#eeeee]'
          name="email"
          id="email"
          autoComplete="email"
          autoFocus
          placeholder="Enter your email"
        />

        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}

          type="password"
          required
          className='mt-2 p-2 mb-1 rounded w-full px-4 border shadow-sm bg-[#eeeee]'
          name="password"
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
        />
       
          <button className='bg-black text-white font-medium py-2 px-4 mt-5 rounded-lg w-full text-lg justify-between items-center'
          > Login as Captain
          </button>

       

        <p className='mt-2 text-sm'>Don't have an account? <Link to='/captain-signup' className='text-blue-500'>Sign Up</Link></p>
        <p className='mt-4 text-sm'>By clicking Login you agree to our <span className='text-blue-500'>Terms of Service</span> and <span className='text-blue-500'>Privacy Policy</span>.</p>

      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default CaptainLogin