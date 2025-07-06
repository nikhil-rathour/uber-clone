const userModel =  require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization ?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if the token is blacklisted
        const isBlacklisted = await userModel.findOne({token : token});
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }


}