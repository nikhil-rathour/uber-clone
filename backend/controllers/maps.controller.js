
const mapsService  = require("../services/maps.service")
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json({ coordinates });
    } catch (error) {
        res.status(404).json({ message: "coordinates not found" });
    }
}


module.exports.getDistanceTime = async (req, res,  next ) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    const distanceTime = await mapsService.getDistanceTime(origin, destination);
    res.status(200).json({ distanceTime });
  }catch(error){

  }
}


module.exports.getAutocompleteSuggestions = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "input query is required" });
        }
        const { input } = req.query;
        // console.log('Received input:', input);
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
        // console.log('Suggestions found:', suggestions);
        res.status(200).json(suggestions);
    }catch(error){
        console.error('Error in getAutocompleteSuggestions:', error);
        res.status(500).json({ error: error.message });
    }
}