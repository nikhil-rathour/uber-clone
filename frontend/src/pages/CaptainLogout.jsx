import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout =  () => {
    const navigate = useNavigate()
    const token =  localStorage.getItem('token')
     axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
      headers:{
          Authorization  :` Bearer ${token}`
      }
  }).then((response) =>{
        if(response.status === 200){
            localStorage.removeItem('token')
            navigate("/captain-login")
        }
    }).catch((error) =>{
        console.log(error)
    })

  return (
    <div>Loading.....</div>

  )
}

export default CaptainLogout