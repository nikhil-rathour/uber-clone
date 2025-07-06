const captainmodel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle} = req.body;
    const isCaptainAlreadyExist = await captainmodel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({message : "captain already exist"})
    }
    const hashedPassword = await captainmodel.hashPassword(password)

    try {
        const captain = await captainService.createCaptain({
          firstname :   fullname.firstname,
          lastname :   fullname.lastname,
            
            email,
            password : hashedPassword,
            color : vehicle.color,
            plate : vehicle.plate,
            capacity : vehicle.capacity,
            vehicleType : vehicle.vehicleType
        });
        // console.log(captain);
        const token = await captain.generateAuthToken();
        return res.status(201).json(captain ,token);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}