import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicalPanel from "../components/VehicalPanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import { toast , ToastContainer } from "react-toastify";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [penalOpen, setpenalOpen] = useState(false);
  const [vehicalPanelOpen, setvehicalPanelOpen] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicalFound, setvehicalFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride , setRide] = useState()

  const panelRef = useRef(null);
  const vehicalPanelRef = useRef(null);
  const panelcloseRef = useRef(null);
  const ConfermRideRef = useRef(null);
  const vehicalFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const navigate = useNavigate()

  // location pikup// drop location suggetion ap hendiling

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggetions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggetions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  function hendelsubmit(e) {
    e.preventDefault();
  }

  // find trip function /

  async function findTrip() {
    if (pickup != "" && destination !="" ) {

    setpenalOpen(false);
    setvehicalPanelOpen(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data);

    }else  toast.error("add trip details")
  }

  // ride creation
  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

  // socket hendiling
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

   socket.on('ride-confirmed', ride => {


        setvehicalFound(false)
        setwaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
     
        setwaitingForDriver(false)
        navigate('/riding', { state: { ride  , vehicleType} }) // Updated navigate to include ride data
    })

    //logout 

      const handleLogout = () => {
        navigate("/user/logout");
    };

  // for location panel
  useGSAP(
    function () {
      if (penalOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          duration: 0.4,
          ease: "power3.out"
        });
        gsap.to(panelcloseRef.current, {
          opacity: "1",
          duration: 0.3,
          delay: 0.1
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0",
          padding: 0,
          duration: 0.4,
          ease: "power3.out"
        });
        gsap.to(panelcloseRef.current, {
          opacity: "0",
          duration: 0.2
        });
      }
    },
    [penalOpen, penalOpen]
  );

  //for vehical panel
  useGSAP(() => {
    if (vehicalPanelOpen) {
      gsap.to(vehicalPanelRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(vehicalPanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, [vehicalPanelOpen]);

  //for confirm ride panel
  useGSAP(() => {
    if (ConfirmRidePanel) {
      gsap.to(ConfermRideRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(ConfermRideRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, [ConfirmRidePanel]);

  // vehica found (lookin for driver)

  useGSAP(() => {
    if (vehicalFound) {
      gsap.to(vehicalFoundRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(vehicalFoundRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, [vehicalFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden bg-gray-50">
      {/* Header with Logo */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
         
           <img
            className="w-16 h-10 object-contain"
            src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
            alt="Logo"
          />
       
          <h3 className=" capitalize  font-medium">hey! {user?.fullname.firstname + " " + user?.fullname.lastname }</h3>

           <button 
                    onClick={handleLogout}
                    className='px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200 flex items-center gap-2'
                >
                    <i className="ri-logout-circle-r-line"></i>
                    <span>Logout</span>
                </button>
        </div>
        
      </div>

      {/* Map Container */}
      <div className="h-screen pt-16">
        <LiveTracking />
         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>

      {/* Main Panel Container */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none">
        {/* Trip Input Panel */}
        <div className="bg-white rounded-t-3xl shadow-2xl pointer-events-auto relative">
          {/* Panel Header */}
          <div className="px-9 pt-10   border-gray-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-gray-900">Where to?</h4>
             
            </div>
             <button
                ref={panelcloseRef}
                onClick={() => setpenalOpen(false)}
              >
           <i className=" text-3xl ri-arrow-down-wide-fill"></i>
              </button>
          </div>

          {/* Trip Form */}
          <div className="px-6 py-6">
            <form onSubmit={hendelsubmit} className="space-y-4">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-4 top-8 w-0.5 h-12  bg-gray-300  rounded-full"></div>
                
                {/* Pickup Location */}
                <div className="relative flex items-center">
                  <div className="absolute left-2 w-3 h-3 mb-4 bg-green-500 rounded-full z-10  "></div>
                  <input
                    onClick={() => {
                      setpenalOpen(true);
                      setActiveField("pickup");
                    }}
                    value={pickup}
                    onChange={handlePickupChange}
                    className="w-full pl-8 mb-5 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    type="text"
                    placeholder="Pickup location"
                  />
                </div>

                {/* Destination */}
                <div className="relative flex items-center">
                  <div className="absolute left-2 w-3 h-3 bg-red-500 rounded-full z-10"></div>
                  <input
                    onClick={() => {
                      setpenalOpen(true);
                      setActiveField("destination");
                    }}
                    value={destination}
                    onChange={handleDestinationChange}
                    className="w-full pl-8 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    type="text"
                    placeholder="Where to?"
                  />
                </div>
              </div>

              {/* Find Trip Button */}
              <button
                onClick={findTrip}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[0.98] active:scale-95 shadow-lg"
              >
                Find Trip
              </button>
            </form>
          </div>
        </div>

        {/* Location Search Panel */}
        <div ref={panelRef} className="bg-white h-0 overflow-hidden pointer-events-auto">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle Pricing Panel */}
      <div
        ref={vehicalPanelRef}
        className="fixed w-full z-30 translate-y-full bottom-0 bg-white rounded-t-3xl shadow-2xl"
      >
        <div className="p-6">
          <VehicalPanel
            setvehicalPanelOpen={setvehicalPanelOpen}
            setConfirmRidePanel={setConfirmRidePanel}
            fare={fare}
            selectVehicle={setVehicleType}
          />
        </div>
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={ConfermRideRef}
        className="fixed w-full z-30 translate-y-full bottom-0 bg-white rounded-t-3xl shadow-2xl"
      >
        <div className="p-6">
          <ConfirmRide
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            createRide={createRide}
            setConfirmRidePanel={setConfirmRidePanel}
            setvehicalFound={setvehicalFound}
          />
        </div>
      </div>

      {/* Looking for Driver Panel */}
      <div
        ref={vehicalFoundRef}
        className="fixed w-full z-30 translate-y-full bottom-0 bg-white rounded-t-3xl shadow-2xl"
      >
        <div className="p-6">
          <LookingForDriver 
            vehicleType={vehicleType}
            pickup={pickup}
            destination={destination}
            fare={fare}
            setvehicalFound={setvehicalFound} 
          />
        </div>
      </div>

      {/* Waiting for Driver Panel */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-30 translate-y-full bottom-0 bg-white rounded-t-3xl shadow-2xl"
      >
        <div className="p-6">
          <WaitingForDriver 
            vehicleType={vehicleType}
            
            ride={ride}
            setvehicalFound={setvehicalFound}
            setwaitingForDriver={setwaitingForDriver} 
          />
        </div>
      </div>
    </div>
  );
}

export default Home;