import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AcceptRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        props.setAcceptRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate('/captain-riding', { state: { ride: props.ride } });
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative pt-20">
      {/* Close button */}
      
      <div className="p-1 pt-8 text-center w-[93%] absolute top-0 z-10">
        
        
      </div>
      
      {/* Header */}
      <h3 className="text-xl font-bold mb-4 text-center">Confirm Ride</h3>
      
      {/* Customer Info */}
      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
            👨
          </div>
          <div>
            <h2 className="text-base font-medium capitalize">
              {props.ride?.user.fullname.firstname + " " +props.ride?.user.fullname.lastname} 
            </h2>
            <div className="flex items-center gap-1">
              <i className="ri-star-fill text-yellow-400 text-xs"></i>
              <span className="text-xs text-gray-600">4.8 (50+ trips)</span>
            </div>
          </div>
        </div>
       
      </div>

      {/* Ride Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center gap-3 p-3 border-b">
          <div className="bg-blue-100 p-2 rounded-full">
            <i className="ri-map-pin-user-fill text-blue-500"></i>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pickup</h3>
            <p className="text-base">{props.ride?.pickup}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 border-b">
          <div className="bg-green-100 p-2 rounded-full">
            <i className="ri-map-pin-2-fill text-green-500"></i>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Destination</h3>
            <p className="text-base">{props.ride?.destination}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <i className="ri-money-rupee-circle-fill text-purple-500"></i>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Fare</h3>
            <p className="text-base">₹{props.ride?.fare} (Cash)</p>
          </div>
        </div>
      </div>

      {/* OTP Form */}
      <div className="mt-4">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP from passenger
            </label>
            <input 
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("");
              }}
              type="text" 
              className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter 4-digit OTP"
              maxLength={6}
              required
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <div className="flex gap-3">
          
            
            <button
              type="submit"
              className={`flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center ${isLoading ? 'opacity-75' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Start Ride"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcceptRidePopUp;