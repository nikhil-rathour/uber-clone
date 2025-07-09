import React from 'react'

const VehicalPanel = (props) => {
  return (
    <div>

<h5 
       onClick={()=>{props.setvehicalPanelOpen(false)}}
       className='p-1 text-center  w-[90%] absolute top-0 '> <i className=" text-3xl ri-arrow-down-wide-fill"></i>
       
</h5>
        <h2 className=' text-2xl font-semibold mb-4'>Choose a Vehicle</h2>

          <div  
          onClick={()=>{
            props.setConfirmRidePanel(true)
          }}
          className=' flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between'>
          <img className='h-12' src="https://th.bing.com/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?w=267&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="" />
          <div className='  w-1/2'>
            <h4 className=' font-medium text-base '>UberGo<span><i className="  ml-2 ri-user-3-fill"></i></span>4</h4>
            <p className=' font-medium text-sm'>2 mins away</p>
            <p className='text-xs mb-1 text-gray-900'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold m-2 '>₹192.20</h2>
        </div>

        <div 
          onClick={()=>{
            props.setConfirmRidePanel(true)
          }}
        className=' flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='  w-1/2'>
            <h4 className=' font-medium text-base '>Moto<span><i className=" ml-2 ri-user-3-fill"></i></span>1</h4>
            <p className=' font-medium text-sm'>2 mins away</p>
            <p className='text-xs mb-1 text-gray-900'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold m-2 '>₹35.20</h2>
        </div>

          <div
             onClick={()=>{
            props.setConfirmRidePanel(true)
          }}
          className=' flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between'>
          <img className='h-12' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
          <div className='  w-1/2'>
            <h4 className=' font-medium text-base '>Auto<span><i className=" ml-2 ri-user-3-fill"></i></span>3</h4>
            <p className=' font-medium text-sm'>2 mins away</p>
            <p className='text-xs mb-1 text-gray-900'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold m-2 '>₹60.20</h2>
        </div>

    </div>
  )
}

export default VehicalPanel