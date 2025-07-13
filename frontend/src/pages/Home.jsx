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
    // if (pickup != "" && destination !="" ) {

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

    // }else   alert("add trip details")
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
        console.log("ride")
        setwaitingForDriver(false)
        navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
    })








  // for location panel
  useGSAP(
    function () {
      if (penalOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          // opacity : "1"
          padding: 24,
        });
        gsap.to(panelcloseRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0",
          // opacity : "0"
          padding: 0,
        });
        gsap.to(panelcloseRef.current, {
          opacity: "0",
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
      });
    } else {
      gsap.to(vehicalPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicalPanelOpen]);

  //for confirm ride panel
  useGSAP(() => {
    if (ConfirmRidePanel) {
      gsap.to(ConfermRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ConfermRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ConfirmRidePanel]);

  // vehica found (lookin for driver)

  useGSAP(() => {
    if (vehicalFound) {
      gsap.to(vehicalFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicalFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicalFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriver.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  return (
    <div className=" h-screen  relative overflow-hidden">
      <img
        className="  w-20 absolute left-5 top-5"
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
        alt=""
      />

      <div className=" h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://imgs.search.brave.com/eAeERG-VmBfO-ohtpm3DK2it5dXPKL-Ds0Ri2k-oG5c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYWJzdHJhY3Qt/Z3BzLW5hdmlnYXRp/b24tc21hcnQtY2Fy/LWxvY2F0aW9uLW1h/cC1wb2ludGVyLWNp/dHktbWFwLWZlYXR1/cmluZy1kaXJlY3Rp/b25hbC1zaWduc183/NTM5NDMtNTQ1Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDA"
          alt="                                     "
        />
      </div>

      <div className=" flex flex-col justify-end h-screen absolute top-0 rounded-lg  w-full ">
        <div className="h-[30%] p-6 bg-white  relative ">
          <h3
            ref={panelcloseRef}
            className=" opacity-0 absolute top-6 right-6 text-2xl "
            onClick={() => {
              setpenalOpen(false);
            }}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h3>

          <h4 className=" text-2xl font-semibold ">Find a trip </h4>
          <form
            onSubmit={(e) => {
              hendelsubmit(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[37%] left-10 bg-gray-950 rounded-full "></div>
            <input
              onClick={() => {
                setpenalOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg  mb-5 mt-3 shadow w-full"
              type="text"
              placeholder=" Add a pickup location"
            />

            <input
              onClick={() => {
                setpenalOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg shadow w-full"
              type="text"
              placeholder=" Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-5 w-full"
          >
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className="bg-white h-[0] ">
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

      {/* vihecal pricing penal  */}

      <div
        ref={vehicalPanelRef}
        className="fixed w-full  z-10 translate-y-full bottom-0 p-3 py-8 px-3 bg-white"
      >
        <VehicalPanel
          setvehicalPanelOpen={setvehicalPanelOpen}
          setConfirmRidePanel={setConfirmRidePanel}
          fare={fare}
          selectVehicle={setVehicleType}
        />
      </div>

      {/* confirm vehical(ride) panel */}

      <div
        ref={ConfermRideRef}
        className="fixed w-full  z-10 translate-y-full bottom-0 p-3 py-8 px-3 bg-white"
      >
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

      {/* looking for a driver  */}
      <div
        ref={vehicalFoundRef}
        className="fixed w-full  z-10 translate-y-full bottom-0 p-3 py-8 px-3 bg-white"
      >
        <LookingForDriver 
          vehicleType={vehicleType}

         pickup={pickup}
          destination={destination}
          fare={fare}
        setvehicalFound={setvehicalFound} />
      </div>

      {/* Waiting For A driver */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full  z-10 translate-y-full bottom-0 p-3 py-8 px-3 bg-white"
      >
        <WaitingForDriver 
        ride={ride}
        setvehicalFound={setvehicalFound}

        setwaitingForDriver={setwaitingForDriver} />
      </div>
    </div>
  );
}

export default Home;
