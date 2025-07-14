import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainDetail = () => {
    const { captain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    // Dummy data
    const dummyStats = {
        rating: 4.8,
        tripsCompleted: 1247,
        earnings: '₹40,000',
     
        onlineHours: '36 hours this week'
    };

    const handleLogout = () => {
        navigate("/captain/logout");
    };

    if (!captain || !captain.fullname) {
        return (
            <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
            {/* Profile Header */}
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-4'>
                    <div className='h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl'>
                        👨‍✈️
                    </div>
                    <div>
                        <h4 className='text-xl font-semibold capitalize'>
                            {captain.fullname.firstname + " " + captain.fullname.lastname}
                        </h4>
                        <div className="flex items-center gap-2">
                            <span className='text-sm text-green-600 font-medium flex items-center'>
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                                Online
                            </span>
                           
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={handleLogout}
                    className='px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200 flex items-center gap-2'
                >
                    <i className="ri-logout-circle-r-line"></i>
                    <span>Logout</span>
                </button>
            </div>

            {/* Stats Cards */}
           

            {/* Vehicle Information */}
            <div className="bg-gray-50 p-5 rounded-xl mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <i className="ri-car-fill text-blue-500"></i>
                    <span>Vehicle Details</span>
                </h3>
                
                <div className="space-y-3">
                    
                    <div className="flex justify-between">
                        <span className="text-gray-600">Plate Number</span>
                        <span className="font-medium capitalize ">{captain?.vehicle.plate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Color</span>
                        <span className="font-medium capitalize ">{captain?.vehicle.color}</span>
                    </div>
                </div>
            </div>

  
           
        </div>
    );
};

export default CaptainDetail;