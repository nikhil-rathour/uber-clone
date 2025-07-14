import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

  const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
      }

    return (
        <div className="p-4">
            {/* Suggestions List */}
            {suggestions.map((elem, idx) => (
                <div 
                    key={idx} 
                    onClick={() => handleSuggestionClick(elem)} 
                    className="flex items-center  gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
                >
                    {/* Location Icon */}
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <i className="ri-map-pin-fill text-gray-600 text-sm"></i>
                    </div>
                    
                    {/* Location Text */}
                    <h4 className="font-medium text-gray-900 flex-1">
                        {elem}
                    </h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel