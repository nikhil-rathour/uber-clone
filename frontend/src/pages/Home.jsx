import React, { useRef } from 'react'
import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import 'remixicon/fonts/remixicon.css'


function Home() {
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  const [penalOpen, setpenalOpen] = useState(false)
  const panelcloseRef = useRef(null)

  const panelRef = useRef(null)


  function hendelsubmit(e) {
    e.preventDefault()
  }



  useGSAP(function () {
    if (penalOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        // opacity : "1"
      })
       gsap.to(panelcloseRef.current,{
        opacity : "1"
       })
    } else {
      gsap.to(panelRef.current, {
        height: "0",
        // opacity : "0"
      })
       gsap.to(panelcloseRef.current,{
        opacity : "0"
       })

    }

  }, [penalOpen , penalOpen])

  return (
    <div className=' h-screen  relative'>
      <img
        className='  w-20 absolute left-5 top-5'
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
        alt="" />

      <div className=' h-screen w-screen'>
        <img
          className='h-full w-full object-cover'
          src="https://imgs.search.brave.com/eAeERG-VmBfO-ohtpm3DK2it5dXPKL-Ds0Ri2k-oG5c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYWJzdHJhY3Qt/Z3BzLW5hdmlnYXRp/b24tc21hcnQtY2Fy/LWxvY2F0aW9uLW1h/cC1wb2ludGVyLWNp/dHktbWFwLWZlYXR1/cmluZy1kaXJlY3Rp/b25hbC1zaWduc183/NTM5NDMtNTQ1Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDA" alt="                                     " />
      </div>


      <div className=' flex flex-col justify-end h-screen absolute top-0 rounded-lg  w-full '>
        <div className='h-[30%] p-6 bg-white  relative '>

          <h3
            ref={panelcloseRef}
            className=' opacity-0 absolute top-6 right-6 text-2xl '

            onClick={()=>{
              setpenalOpen(false)
            }}
          >  
          <i class="ri-arrow-down-wide-line"></i>
          
          
          </h3>
          
          <h4 className=' text-2xl font-semibold '>Find a trip </h4>
          <form onSubmit={(e) => {
            hendelsubmit(e)
          }}>
            <div className='line absolute h-16 w-1 top-[37%] left-10 bg-gray-950 rounded-full '></div>
            <input
              onClick={() => {
                setpenalOpen(true)
              }}
              value={pickup}
              onChange={(e) => setpickup(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg  mb-5 mt-3 shadow w-full' type="text" placeholder=' Add a pickup location' />


            <input
              onClick={() => {
                setpenalOpen(true)
              }}
              value={destination}
              onChange={(e) => setdestination(e.target.value)}

              className='bg-[#eee] px-12 py-2 text-base rounded-lg shadow w-full' type="text" placeholder=' Enter your destination' />
          </form>
        </div>

        <div ref={panelRef} className='bg-red-500 h-[70] opacity-0'>

        </div>

      </div>

    </div>
  )
}

export default Home