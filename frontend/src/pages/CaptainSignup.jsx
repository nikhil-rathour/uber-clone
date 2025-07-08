import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainSignup = () => {

  const [firstname, setFisrtname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [color, setColor] = useState("")
    const [plate, setPlate] = useState("")
    const [capacity, setCapacity] = useState("")
    const [vehicleType, setVehicleType] = useState("")

    const {captain , setCaptain} = useContext(CaptainDataContext)
    const navigate = useNavigate()
    
  const hendelSubmit = async(e)=>{
    e.preventDefault()
    
    const captainData = {
      fullname : {
        firstname : firstname,
        lastname : lastname
      },
      email : email,
      password : password,
      vehicle : {
        color : color,
        plate : plate,
        vehicleType : vehicleType,
        capacity : capacity
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if(response.status === 201){
      const data = response.data
      setCaptain(data)
      localStorage.setItem("token", data.token)
      navigate("/captain-home")
    }else{
      alert("internal server error")
    }
    
 
    setFisrtname("")
    setLastname("")
    setEmail("")
    setPassword("")
    setColor("")
    setPlate("")
    setVehicleType("")
    setCapacity("")

    
  }
  
  return (
    <div className="flex flex-col  justify-center p-5  ">
      <Link to="/captain-login">

        <img
          className='   w-8  '
          src="resetImage.png" />
      </Link>
      <img
        className='  mb-5  mx-auto w-48'
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
        alt="" />

        <form onSubmit={(e) => hendelSubmit(e)} >
         <h3 className=' text-xl font-medium'>Create an account as Captain</h3>
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

        {/* Vehicle Info Section */}
        <div className="pb-3">
          <h4 className='text-lg font-semibold mt-6 mb-2'>Vehicle Info</h4>
          <div className="flex flex-row gap-2 pb-3">
            
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              required
              className='mt-2 p-2 rounded w-full px-4 border shadow-sm bg-[#eeeee]'
              name="color"
              id="color"
              placeholder="Vehicle color"
            />
              <input
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              type="text"
              required
              className='mt-2 p-2 rounded w-full px-4 border shadow-sm bg-[#eeeee]'
              name="plate"
              id="plate"
              placeholder="Vehicle plate "
            />
            </div>

            <div className="flex flex-row gap-2 pb-3">
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className='mt-2 p-2 rounded w-full px-4 border shadow-sm bg-[#eeeee]'
              name="vehicleType"
              id="vehicleType"
            >
              <option value="" disabled>Vehicle type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              className='mt-2 p-2 rounded w-full px-4 border shadow-sm bg-[#eeeee]'
              name="capacity"
              id="capacity"
            >
              <option value="" disabled>Capacity</option>
              {[...Array(8)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
          </div>
        </div>

        <button className='bg-black text-white font-medium py-2 px-4 mt-5 rounded-lg w-full text-lg justify-between items-center'
        > Create Account
        </button>



    
  </form>
  <p className='mt-2 text-sm'>Already have an account? <Link to='/captain-login' className='text-blue-500'>Log In</Link></p>
    <p className='mt-4 text-sm'>By clicking Create Account, you agree to our <span className='text-blue-500'>Terms of Service</span> and <span className='text-blue-500'>Privacy Policy</span>.</p>
</div>
)
}

export default CaptainSignup