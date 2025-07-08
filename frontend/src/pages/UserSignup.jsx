import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'



const UserSignup = () => {
  const [firstname, setFisrtname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [userData, setuserData] = useState({})

  const navigate = useNavigate()
  const {user , setUser} =  useContext(UserDataContext)


  const hendelSubmit = async (e)=>{
    e.preventDefault()
    // console.log('H"Yhyhyhyhyhy');
     const newUser ={
      fullname : {
        firstname : firstname,
        lastname : lastname
      },
      email : email,
      password : password

    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register` , newUser)
    if(response.status === 200){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate("/home")
    }else{
      alert("internal server error")
    }


    setFisrtname("")
    setLastname("")
    setEmail("")
    setPassword("")
    
  }

  return (
    <div className="flex flex-col  justify-center p-5 ">

         <Link to="/login">
               
               <img 
                 className='   w-8  '
               src="resetImage.png"/>
               </Link>

      <img 
        className='  mb-10  mx-auto w-48'
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400" 
        alt="" />

     <form onSubmit={(e) => hendelSubmit(e)} >
       <h3  className=' text-xl font-medium'>Create an account</h3>


       <div className="flex flex-row gap-2 pb-3">
          <input
          value={firstname}
          onChange={(e)=>setFisrtname(e.target.value)}
            type="text"
            required
            className='mt-2 p-2  rounded w-full px-4 border shadow-sm bg-[#eeeee]'
            name="firstName"
            id="firstName"
            autoComplete="first-name"
            autoFocus
            placeholder="Enter Name"
          />

          <input
           value={lastname}
          onChange={(e)=>setLastname(e.target.value)}
            type="text"
            required
            className='mt-2 p-2  rounded w-full px-4 border shadow-sm bg-[#eeeee]'
            name="lastName"
            id="lastName"
            autoComplete="last-name"
            autoFocus
            placeholder="Last Name"
          />


        </div>



        <input
         value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
          required
          className='mt-2 p-2 mb-3 rounded w-full px-4 border shadow-sm bg-[#eeeee]'
          name="email"
          id="email"
          autoComplete="email"
          autoFocus
          placeholder="Enter your email"
        />

        <input
         value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
          required
          className='mt-2 p-2  rounded w-full px-4 border shadow-sm bg-[#eeeee]'
          name="password"
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
        />
       
              <button className='bg-black text-white font-medium py-2 px-4 mt-5 rounded-lg w-full text-lg justify-between items-center'
              > Create Account
              </button>
     </form>
         <p className='mt-2 text-sm'>Already have an account? <Link to='/login' className='text-blue-500'>Log In</Link></p>
        <p className='mt-4 text-sm'>By clicking Create Account, you agree to our <span className='text-blue-500'>Terms of Service</span> and <span className='text-blue-500'>Privacy Policy</span>.</p>
    </div>
  )
}

export default UserSignup