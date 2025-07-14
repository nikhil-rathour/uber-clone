import React from 'react'

const WaitingForDriver = (props) => {
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

  return (
    <div className="relative pb-6">
      {/* Close button */}
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setwaitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      {/* Driver found confirmation with animation */}
      <div className="mb-4 p-3 bg-green-50 rounded-lg animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-checkbox-circle-fill text-green-600 text-xl"></i>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <h3 className="font-medium text-green-800">Driver confirmed your ride!</h3>
            <p className="text-sm text-green-600">They'll reach your location soon</p>
          </div>
        </div>
      </div>

      {/* Driver & Vehicle Details */}
      <div className='flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-4'>
        <div className="relative">
          <img 
            className='h-16 object-contain' 
            src={vehicleImages[props.vehicleType] || vehicleImages.car} 
            alt={props.ride?.vehicleType || "vehicle"} 
          />
          {/* Vehicle arrival animation */}
          <div className="absolute -bottom-2 left-0 w-full flex justify-center">
            <div className="bg-white px-2 py-1 rounded-full shadow-xs border border-gray-200 flex items-center">
              <div className="flex space-x-1">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="ml-1 text-xs text-gray-600">Arriving</span>
            </div>
          </div>
        </div>
        
        <div className='text-right'>
          <div className="flex items-center justify-end gap-2">
            <h2 className='text-lg font-medium capitalize'>
              {props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}
            </h2>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="flex items-center justify-end gap-2 mt-1">
            <i className="ri-star-fill text-yellow-400"></i>
            <span className="text-sm font-medium">{props.ride?.captain.rating || "4.8"}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{props.ride?.captain.trips || "500+"} trips</span>
          </div>
          
          <h4 className='text-lg font-semibold mt-1'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600 -mt-1'>
          {[props.vehicleType] || vehicleImages.car } 

          </p>
          
          <div className="mt-2 flex items-center justify-end gap-2">
            <div className="bg-blue-50 px-2 py-1 rounded-full">
              <h1 className='text-sm font-semibold text-blue-600'>OTP: {props.ride?.otp}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Details */}
      <div className='flex gap-2 justify-between flex-col items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100'>
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
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
      </div>

    
    </div>
  )
}

export default WaitingForDriver