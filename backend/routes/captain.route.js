const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const captainController = require('../controllers/captain.controller');
const  authmiddleware  = require('../middelwares/auth.middelware');



router.post('/register' , [
    body("email").isEmail().withMessage("invalid Email"),
    body("fullname.firstname").isLength({min : 3}).withMessage("Firstname must be at least 3 characters long"),
    body("fullname.lastname").isLength({min : 3}).withMessage("Lastname must be at least 3 characters long"),
    body("password").isLength({min : 6}).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({min : 3}).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({min : 3}).withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity").isInt({min : 1}).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType").isIn(['car', 'bike', 'auto']).withMessage("Vehicle type must be one of the following: car, bike, auto"),
], 
  captainController.registerCaptain
)

router.post("/login" , [
    body("email").isEmail().withMessage("invalid Email"),
    body("password").isLength({min : 6}).withMessage("Password must be at least 6 characters long"),
], 
  captainController.loginCaptain
)
router.get('/profile', authmiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authmiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;
