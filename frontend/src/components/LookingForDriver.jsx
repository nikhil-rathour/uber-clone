import React from 'react'

const LookingForDriver = (props) => {
    // Vehicle images mapping
    const vehicleImages = {
        car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
        moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
    };

    return (
        <div className="relative">
            {/* Close button */}
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setvehicalFound(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                {/* Vehicle image with pulse animation */}
                <div className="relative">
                    <img 
                        className='h-20 animate-pulse' 
                        src={vehicleImages[props.vehicleType] || vehicleImages.car} 
                        alt={props.vehicleType || "vehicle"} 
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border border-gray-200">
                        <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>

                {/* Ride details */}
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Drop</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                {/* Searching animation */}
                <div className="w-full mt-6 text-center">
                    <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 mb-3">
                            <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>
                            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
                                <i className="text-blue-600 ri-car-fill text-xl"></i>
                            </div>
                        </div>
                        <p className="text-gray-600 animate-pulse">Searching for drivers nearby...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver