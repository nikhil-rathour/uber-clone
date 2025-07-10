const express = require('express');
const router = express.Router();
const authMiddleware = require('../middelwares/auth.middelware');
const mapController = require('../controllers/maps.controller');
const { query } = require('express-validator');



router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates
);


router.get("/get-distance-time", 
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
);



router.get("/get-suggetions",
    query("input").isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutocompleteSuggestions
);

module.exports = router;