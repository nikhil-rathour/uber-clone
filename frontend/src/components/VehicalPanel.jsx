import React from 'react'

const VehicalPanel = (props) => {
  return (
    <div className="relative">
      {/* Close Button */}
      <button 
        onClick={() => props.setvehicalPanelOpen(false)}
        className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
      >
        <i className="ri-arrow-down-wide-fill text-gray-600 text-xl"></i>
      </button>

      {/* Header */}
      <div className="mb-6 pt-4">
        <h2 className="text-xl font-bold text-gray-900">Choose a Vehicle</h2>
        <p className="text-sm text-gray-500 mt-1">Select your preferred ride option</p>
      </div>

      {/* Vehicle Options */}
      <div className="space-y-3">
        {/* Car Option */}
        <div  
          onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('car')
          }}
          className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 hover:border-gray-300 active:border-black rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <img 
                className="h-10 w-auto object-contain" 
                src="https://th.bing.com/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?w=267&h=180&c=7&r=0&o=7&pid=1.7&rm=3" 
                alt="Car" 
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">UberGo</h4>
                <div className="flex items-center gap-1 text-gray-500">
                  <i className="ri-user-3-fill text-sm"></i>
                  <span className="text-sm">4</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">2 mins away</p>
              <p className="text-xs text-gray-500">Affordable, compact rides</p>
            </div>
          </div>
          <div className="text-right">
            {props.fare.car ? (
              <h2 className="text-lg font-bold text-gray-900">₹{props.fare.car}</h2>
            ) : (
              <div className="animate-pulse h-6 w-16 bg-gray-200 rounded-md"></div>
            )}
          </div>
        </div>

        {/* Moto Option */}
        <div 
          onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('moto')
          }}
          className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 hover:border-gray-300 active:border-black rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <img 
                className="h-10 w-auto object-contain" 
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" 
                alt="Moto" 
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">Moto</h4>
                <div className="flex items-center gap-1 text-gray-500">
                  <i className="ri-user-3-fill text-sm"></i>
                  <span className="text-sm">1</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">2 mins away</p>
              <p className="text-xs text-gray-500">Affordable, compact rides</p>
            </div>
          </div>
          <div className="text-right">
            {props.fare.moto ? (
              <h2 className="text-lg font-bold text-gray-900">₹{props.fare.moto}</h2>
            ) : (
              <div className="animate-pulse h-6 w-16 bg-gray-200 rounded-md"></div>
            )}
          </div>
        </div>

        {/* Auto Option */}
        <div
          onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('auto')
          }}
          className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 hover:border-gray-300 active:border-black rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <img 
                className="h-10 w-auto object-contain" 
                src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" 
                alt="Auto" 
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">Auto</h4>
                <div className="flex items-center gap-1 text-gray-500">
                  <i className="ri-user-3-fill text-sm"></i>
                  <span className="text-sm">3</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">2 mins away</p>
              <p className="text-xs text-gray-500">Affordable, compact rides</p>
            </div>
          </div>
          <div className="text-right">
            {props.fare.auto ? (
              <h2 className="text-lg font-bold text-gray-900">₹{props.fare.auto}</h2>
            ) : (
              <div className="animate-pulse h-6 w-16 bg-gray-200 rounded-md"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicalPanel