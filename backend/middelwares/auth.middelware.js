const userModel =  require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainmodel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.authUser = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization ?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if the token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({token : token});
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await captainmodel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }


}

module.exports.authCaptain = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization ?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if the token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({token : token});
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainmodel.findById(decoded._id);
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}