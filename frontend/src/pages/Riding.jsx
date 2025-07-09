import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
 return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                {/* <LiveTracking /> */}
                  <img
          className="h-full w-full object-cover"
          src="https://imgs.search.brave.com/eAeERG-VmBfO-ohtpm3DK2it5dXPKL-Ds0Ri2k-oG5c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYWJzdHJhY3Qt/Z3BzLW5hdmlnYXRp/b24tc21hcnQtY2Fy/LWxvY2F0aW9uLW1h/cC1wb2ludGVyLWNp/dHktbWFwLWZlYXR1/cmluZy1kaXJlY3Rp/b25hbC1zaWduc183/NTM5NDMtNTQ1Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDA"
          alt="                                     "
        />

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>Captain Name</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>GJ XJ 0003</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>

                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Chandekha</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹150 </h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding