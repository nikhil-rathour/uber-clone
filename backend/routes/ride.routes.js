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

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)


router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)




module.exports = router;