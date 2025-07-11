const express = require('express');
const router = express.Router();
const { body ,  query} = require('express-validator');
const rideController = require('../controllers/ride.contoller');
const authMiddleware = require('../middelwares/auth.middelware');

router.post("/create", 
    authMiddleware.authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("pickupLocation is required"),
    body("destination").isString().isLength({ min: 3 }).withMessage("destinationLocation is required"),
    body("vehicleType").isString().isIn(["auto", "car", "moto"]).withMessage("vehicleType is required"),
    rideController.createRide ,
   

) 

router.get("/get-fare",
    authMiddleware.authUser,
    
    query("pickup").isString().isLength({min : 3}).withMessage("invalid pickup"),
    query("destination").isString().isLength({min : 3}).withMessage("invalid destination"),


    rideController.getFare
)



module.exports = router;