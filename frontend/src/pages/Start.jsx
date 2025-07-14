import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
  const handleContinue = () => {
    // Replace this with your navigation logic
    console.log('Navigate to login page')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with proper mobile spacing */}
      <div className="flex flex-col min-h-screen">
        
        {/* Image section - takes up most of the screen */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <img 
              src="image.png" 
              alt="Uber welcome illustration" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Bottom section with content */}
        <div className="bg-white px-6 py-8 rounded-t-3xl shadow-2xl">
          <div className="max-w-sm mx-auto">
            {/* Welcome text */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Get started with Uber
              </h1>
              <p className="text-gray-600 text-base">
                Your ride is just a tap away
              </p>
            </div>

            {/* Continue button */}
           <Link to="/login">
           
            <button 
              onClick={handleContinue}
              className="w-full bg-black hover:bg-gray-800 active:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-colors duration-200 shadow-md"
            >
              Continue
            </button>
           </Link>

            {/* Additional options */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                By continuing, you agree to our{' '}
                <span className="text-black underline cursor-pointer hover:text-gray-700">
                  Terms of Service
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start