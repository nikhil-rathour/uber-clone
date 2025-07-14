import React from "react";

const RidePopUp = (props) => {
  return (
    <div className="relative pb-4">
      {/* Close button */}
      
      
      {/* Header */}
      <h3 className="text-2xl font-semibold mb-3">New Ride Request</h3>
      
      {/* Customer Profile with Emoji */}
      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg mb-4">
        <div className="text-4xl bg-white p-3 rounded-full">👨</div>
        <div>
          <h2 className="text-lg font-medium capitalize ">
            {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              <i className="ri-star-fill text-yellow-400 text-sm"></i>
              <span className="text-sm font-medium ml-1">4.8</span>
            </div>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-sm text-gray-600">Regular rider</span>
          </div>
        </div>
      </div>

      {/* Ride Details with Icons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="bg-blue-100 p-2 rounded-full">
            <i className="ri-map-pin-user-fill text-blue-500 text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-medium">Pickup Location</h3>
            <p className="text-sm text-gray-600 mt-1">{props.ride?.pickup}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="bg-green-100 p-2 rounded-full">
            <i className="ri-map-pin-2-fill text-green-500 text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm text-gray-600 mt-1">{props.ride?.destination}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-4">
          <div className="bg-purple-100 p-2 rounded-full">
            <i className="ri-money-rupee-circle-fill text-purple-500 text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
            <p className="text-sm text-gray-600 mt-1">Cash payment</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            props.setRidePopupPanel(false);
          }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <i className="ri-close-line"></i>
          Decline
        </button>
        
        <button
          onClick={() => {
            props.setAcceptRidePopupPanel(true);
            props.confirmRide();
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <i className="ri-check-line"></i>
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;