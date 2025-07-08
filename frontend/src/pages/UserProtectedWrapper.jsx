import React,{useContext, useEffect , useState} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserProtectedWrapper = ({children}) => {

    const { setUser} = useContext(UserDataContext)
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(true)
    const token = localStorage.getItem("token");
     
    useEffect(()=>{
         if(!token){
        navigate("/login")

    }

     axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers:{
          Authorization  :` Bearer ${token}`
      }

    }).then(response =>{
      if(response.status === 200){
        const data =  response.data
        setUser(data)
        setisLoading(false)
      }
    }).catch(err=>{
      console.log(err);
      localStorage.removeItem("token")
      navigate("/login")
      
    })
    },[token])

    if(isLoading){
      <div>Loading</div>
    }

    return (
  <>
   {children}
  </>
  )
}

export default UserProtectedWrapper