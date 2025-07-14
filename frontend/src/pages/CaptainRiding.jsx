import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'
import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride
    const { captain } = useContext(CaptainDataContext)

    useGSAP(() => {
        gsap.to(finishRidePanelRef.current, {
            y: finishRidePanel ? 0 : '100%',
            ease: "power2.inOut",
            duration: 0.3
        })
    }, [finishRidePanel])

    return (
        <div className="h-screen relative overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md shadow-sm">
                <div className="flex items-center justify-between px-6 py-3">
                    <img
                        className="w-16 h-10 object-contain"
                        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
                        alt="Logo"
                    />
                    <h3 className="capitalize font-medium">Hello captain! {captain?.fullname.firstname }</h3>
                    <Link 
                        to='/captain-home' 
                        className='h-10 w-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-full transition-colors'
                    >
                        <i className="ri-logout-box-r-line text-gray-700"></i>
                    </Link>
                </div>
            </div>

            {/* Map View */}
            <div className='h-full w-full fixed top-0 z-0'>
                <LiveTracking />
            </div>

            {/* Consolidated Ride Panel */}
            {!finishRidePanel && (
                <div className='fixed bottom-4 left-4 right-4 z-10 bg-white rounded-xl shadow-xl p-4'>
                    {/* Panel Handle */}
                    <div 
                        className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-200 rounded-full"
                        onClick={() => setFinishRidePanel(!finishRidePanel)}
                    ></div>

                    {/* Passenger Info */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full text-xl">
                                {rideData?.user.gender === 'female' ? '👩' : '👨'}
                            </div>
                            <div>
                                <h4 className='font-medium capitalize'>
                                    {rideData?.user.fullname.firstname + " "+ rideData?.user.fullname.lastname || 'Passenger'}
                                </h4>
                                <div className="flex items-center gap-1">
                                    <i className="ri-star-fill text-yellow-400 text-xs"></i>
                                    <span className='text-xs text-gray-600'>4.8 (50+ trips)</span>
                                </div>
                            </div>
                        </div>
                       
                    </div>

                    {/* Ride Status */}
                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg mb-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <i className="ri-roadster-line text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 className='text-blue-800 font-semibold'>En route to destination</h4>
                                
                            </div>
                        </div>
                        <button 
                            onClick={() => setFinishRidePanel(true)}
                            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors'
                        >
                            Complete
                        </button>
                    </div>

                    {/* Ride Details */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500">Pickup</p>
                            <p className="font-medium">{rideData?.pickup || 'Loading...'}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-500">Destination</p>
                            <p className="font-medium">{rideData?.destination || 'Loading...'}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg col-span-2">
                            <p className="text-gray-500">Fare</p>
                            <p className="font-medium">₹{rideData?.fare || '--'} (Cash)</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Finish Ride Panel */}
            <div ref={finishRidePanelRef} className='fixed bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl shadow-2xl'>
                <FinishRide 
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>
        </div>
    )
}

export default CaptainRiding