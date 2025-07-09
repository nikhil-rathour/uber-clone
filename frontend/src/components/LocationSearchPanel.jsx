import React from 'react'

const LocationSearchPanel = (prop) => {


  const locatiom =[
    "24B Sabarmati Ahemedabad ",
    "24eB Sabarmati Ahemedabad ",
    "2B Sabarmati Ahemedabad ",
    "24eeB Sabarmati Ahemedabad ",
    "24eeB Sabarmati Ahemedabad ",
  ]
  return (
   <div>
              {/* locatiom demo deta */}
      {  
        locatiom.map((ele)=>{
          return(
             <div
             onClick={()=>{
              prop.setvehicalPanelOpen(true)
              prop.setpenalOpen(false)
             }}
             className='flex  border-2 p-3 rounded-xl my-2  border-gray-200 active:border-black  items-center gap-3  my-42justify-start'>
      <h2 className='bg-[#eee] h-8  w-8 flex items-center justify-center  rounded-full'><i className="ri-map-pin-fill"></i></h2>
      <h4 className='font-medium'>{ele} </h4>
    </div>
          )
        })
      }
    {/* locatiom demo deta */}
    

    
   </div>
  )
}

export default LocationSearchPanel