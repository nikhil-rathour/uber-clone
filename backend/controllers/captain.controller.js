const blacklistTokenModel = require('../models/blacklistToken.model');
const captainmodel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res ,next) => {
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
        const token =  captain.generateAuthToken();
        return res.status(201).json({token , captain});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.loginCaptain = async (req, res ,  next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const captain = await captainmodel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(404).json({ message: "invalid email or password" });
        }
        const isPasswordMatch = await captain.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "invalid email or password" });
        }
        const token = await captain.generateAuthToken();
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }
        res.cookie("token", token);
        return res.status(200).json({ captain, token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        const captain = req.captain;
        return res.status(200).json({captain});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        // Add the token to the blacklist
        await blacklistTokenModel.create({ token });
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}