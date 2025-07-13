import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const CaptainDetail = () => {
    const {captain} = useContext(CaptainDataContext)
const navigate = useNavigate()
 
    
    const handleLogout = () => {
         
        navigate("/captain/logout")
        
    };

    if (!captain || !captain.fullname) {
        // You can return a loading spinner, a message, or just null
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <div className='h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl'>
                        👨‍✈️
                    </div>
                    <div>
                        <h4 className='text-lg font-medium capitalize'>
                            {captain.fullname.firstname + " " + captain.fullname.lastname}
                        </h4>
                        <span className='text-sm text-green-600 font-medium'>● Active</span>
                    </div>
                </div>
                
                <button 
                    onClick={handleLogout}
                    className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default CaptainDetail