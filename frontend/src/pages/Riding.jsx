import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
import { UserDataContext } from '../context/UserContext'

const Riding = () => {
    const location = useLocation()
    const { ride  , vehicleType} = location.state || {}
    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)
    const navigate = useNavigate()

    // Vehicle images mapping
    const vehicleImages = {
        car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
        moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
    };

    // Vehicle types mapping
    const vehicleTypes = {
        car: "Car",
        moto: "Motorcycle",
        auto: "Auto Rickshaw"
    };

    useEffect(() => {
        socket.on("ride-ended", () => {
            navigate('/home')
        })

        return () => {
            socket.off("ride-ended")
        }
    }, [socket, navigate])

    return (
        <div className='h-screen'>
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md shadow-sm">
                <div className="flex items-center justify-between px-6 py-3">
                    <img
                        className="w-16 h-10 object-contain"
                        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
                        alt="Logo"
                    />
                    <h3 className="capitalize font-medium">hey! {user?.fullname.firstname + " " + user?.fullname.lastname}</h3>
                </div>
            </div>

            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>

            {/* Map Section */}
            <div className='h-1/2'>
                <LiveTracking />
            </div>

            {/* Ride Details Section */}
            <div className='h-1/2 p-4'>
                {/* Current Ride Status Animation */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg animate-pulse-slow">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <i className="ri-roadster-line text-blue-600"></i>
                            </div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                        </div>
                        <div>
                            <p className="text-sm text-blue-600">On the way to your destination</p>
                        </div>
                    </div>
                </div>

                {/* Driver & Vehicle Details */}
                <div className='flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-4'>
                    <div className="relative">
                        <img 
                            className='h-16 object-contain' 
                            src={vehicleImages[vehicleType] || vehicleImages.car} 
                            alt={vehicleType || "vehicle"} 
                        />
                        <div className="absolute -bottom-2 left-0 w-full flex justify-center">
                            <div className="bg-white px-2 py-1 rounded-full shadow-xs border border-gray-200 flex items-center">
                                <div className="flex space-x-1">
                                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                                <span className="ml-1 text-xs text-gray-600">Moving</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='text-right'>
                        <div className="flex items-center justify-end gap-2">
                            <h2 className='text-lg font-medium capitalize'>
                                {ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}
                            </h2>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-2 mt-1">
                            <i className="ri-star-fill text-yellow-400"></i>
                            <span className="text-sm font-medium">{ride?.captain.rating || "4.8"}</span>
                        </div>
                        
                        <h4 className='text-lg font-semibold mt-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600 -mt-1'>
                            {vehicleTypes[ride?.vehicleType] || "Maruti Suzuki Alto"}
                        </p>
                    </div>
                </div>

                {/* Ride Information */}
                <div className='flex gap-2 justify-between flex-col items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-4'>
                    <div className='w-full'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <div className="relative">
                                <i className="text-lg ri-map-pin-2-fill text-red-500"></i>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                            </div>
                            <div>
                                <h3 className='text-lg font-medium'>Destination</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line text-green-500"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Pay {ride?.fare} in cash when you arrive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding