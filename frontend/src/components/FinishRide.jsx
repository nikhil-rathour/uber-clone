import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState(false)

    async function endRide() {
        setIsLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
                rideId: props.ride._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status === 200) {
                
                navigate('/captain-home')
            }
        } catch (error) {
            log.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <div className="relative pb-6">
           
           
            
            {/* Header */}
            <h3 className="text-xl font-bold mb-4 pt-3 text-center">Complete Ride</h3>
            
            {/* Passenger Info */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                        {props.ride?.user.gender === 'female' ? '👩' : '👨'}
                    </div>
                    <div>
                        <h2 className="text-lg font-medium capitalize">
                            {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname } 
                        </h2>
                        <div className="flex items-center gap-1 mt-1">
                            <i className="ri-star-fill text-yellow-400 text-xs"></i>
                            <span className="text-xs text-gray-600">4.8 (50+ trips)</span>
                        </div>
                    </div>
                </div>
                
            </div>

            {/* Ride Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-4 p-4 border-b">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <i className="ri-map-pin-user-fill text-blue-500"></i>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Pickup Location</h3>
                        <p className="text-base">{props.ride?.pickup}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 border-b">
                    <div className="bg-green-100 p-2 rounded-full">
                        <i className="ri-map-pin-2-fill text-green-500"></i>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Destination</h3>
                        <p className="text-base">{props.ride?.destination}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 p-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                        <i className="ri-money-rupee-circle-fill text-purple-500"></i>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Fare</h3>
                        <p className="text-base">₹{props.ride?.fare} (Cash collected ) </p>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="px-4">
                <button
                    onClick={endRide}
                    disabled={isLoading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        isLoading ? 'opacity-75' : ''
                    }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Completing...
                        </>
                    ) : (
                        <>
                            <i className="ri-check-line"></i>
                            Complete Ride
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default FinishRide