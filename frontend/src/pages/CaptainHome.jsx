
import { useRef,  useState  } from "react"
import CaptainDetail from "../components/CaptainDetail"
import RidePopUp from "../components/RidePopUp"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Link } from "react-router-dom"
import AcceptRidePopUp from "../components/AcceptRidePopUp";

const CaptainHome = () => {

  const [RidePopupPanel, setRidePopupPanel] = useState(true)
  const [AcceptRidePopupPanel, setAcceptRidePopupPanel] = useState(false)






  //ref
  const RidePopupPanelRef   =  useRef(null)
  const AcceptRidePopupPanelRef   =  useRef(null)




 // ride popup

   useGSAP(() => {
    if (RidePopupPanel) {
      gsap.to(RidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(RidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [RidePopupPanel]);


  //ride accept popup panel

   useGSAP(() => {
    if (AcceptRidePopupPanel) {
      gsap.to(AcceptRidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(AcceptRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [AcceptRidePopupPanel]);


  return (
    <div> <div className='h-screen'>
           <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-1/2'>
                {/* <LiveTracking /> */}
                  <img
          className="h-full w-full object-cover"
          src="https://imgs.search.brave.com/eAeERG-VmBfO-ohtpm3DK2it5dXPKL-Ds0Ri2k-oG5c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYWJzdHJhY3Qt/Z3BzLW5hdmlnYXRp/b24tc21hcnQtY2Fy/LWxvY2F0aW9uLW1h/cC1wb2ludGVyLWNp/dHktbWFwLWZlYXR1/cmluZy1kaXJlY3Rp/b25hbC1zaWduc183/NTM5NDMtNTQ1Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDA"
          alt="                                     "
        />

            </div>
            <div className='h-1/2 p-4'>
                <CaptainDetail/>

            </div>

          <div ref={RidePopupPanelRef}  className='fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
                <RidePopUp
                setRidePopupPanel={setRidePopupPanel}
                setAcceptRidePopupPanel={setAcceptRidePopupPanel}

                />
              </div>
           
                <div ref={AcceptRidePopupPanelRef}  className='fixed w-full z-10 bottom-0 h-screen bg-white px-3 py-10 pt-12'>
                <AcceptRidePopUp
              setRidePopupPanel={setRidePopupPanel}
                setAcceptRidePopupPanel={setAcceptRidePopupPanel}
                />
              </div>


              

              
        </div>
        </div>
  )
}

export default CaptainHome