import React,{useContext, useEffect , useState} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedWrapper = ({children}) => {

    //  const {isLoadin, setisLoadin} = useContext(CaptainDataContext)

    const {captain , setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setisLoading] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
     
    useEffect(()=>{
         if(!token){
        navigate("/captain-login")
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile` ,{
        headers :{
         Authorization : `Bearer ${token}`
        }
  }).then(response=>{
     if(response.status ===200){
         setCaptain(response.data.captain)
         setisLoading(false)
     }

  }).catch(err =>{
     console.log(err);
     localStorage.removeItem('token')
     navigate("/captain-login")
     
  })
 
},[token])


   if(isLoading){
    return <div>Loading...</div>
   }
    



    return (
  <>
   {children}
  </>
  )
}

export default CaptainProtectedWrapper