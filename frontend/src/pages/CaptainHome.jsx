
import { useRef,  useState  } from "react"
import CaptainDetail from "../components/CaptainDetail"
import RidePopUp from "../components/RidePopUp"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom"
import AcceptRidePopUp from "../components/AcceptRidePopUp";
import { useEffect , useContext} from "react";
import { SocketContext } from "../context/SocketContext";
import {CaptainDataContext} from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {

  const [RidePopupPanel, setRidePopupPanel] = useState(false)
  const [AcceptRidePopupPanel, setAcceptRidePopupPanel] = useState(false)
      const [ ride, setRide ] = useState(null)
    //ref
  const RidePopupPanelRef   =  useRef(null)
  const AcceptRidePopupPanelRef   =  useRef(null)


   const {socket} = useContext(SocketContext)
    const {captain} = useContext(CaptainDataContext)

  useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])
    
    socket.on('new-ride', (data) => {
    console.log(ride);
        setRide(data)
        setRidePopupPanel(true)

    })


      async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setAcceptRidePopupPanel(true)

    }


    






 // ride popup

   useGSAP(() => {
    if (RidePopupPanel) {
      gsap.to(RidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(RidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [RidePopupPanel]);


  //ride accept popup panel

   useGSAP(() => {
    if (AcceptRidePopupPanel) {
      gsap.to(AcceptRidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(AcceptRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [AcceptRidePopupPanel]);




  return (
    <div>
       
      
       <div className='h-screen'>
           {/* Header with Logo */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
         
           <img
            className="w-16 h-10 object-contain"
            src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
            alt="Logo"
          />

          <h3 className=" capitalize  font-medium">Hello captain! {captain?.fullname.firstname }</h3>

       
        </div>
        
      </div>
           <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-1/2'>
                <LiveTracking />
                  

            </div>
            <div className='h-1/2 p-4'>
                <CaptainDetail/>
             

            </div>

          <div ref={RidePopupPanelRef}  className='fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
                <RidePopUp
                ride={ride}
                // passenger = {passenger}
                setRidePopupPanel={setRidePopupPanel}
                setAcceptRidePopupPanel={setAcceptRidePopupPanel}
                confirmRide = {confirmRide}

                />
              </div>
           
                <div ref={AcceptRidePopupPanelRef}  className='fixed w-full z-10 bottom-0 h-screen bg-white px-3 py-10 pt-12'>
                <AcceptRidePopUp
                ride={ride}
              setRidePopupPanel={setRidePopupPanel}
                setAcceptRidePopupPanel={setAcceptRidePopupPanel}
                />
              </div>


              

              
        </div>
        </div>
  )
}

export default CaptainHome