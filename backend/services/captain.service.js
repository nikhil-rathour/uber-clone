const captainmodel = require("../models/captain.model");

module.exports.createCaptain = async ({ firstname, lastname, email, password ,color , plate , capacity , vehicleType }) => {
    if (!firstname || !email || !password  || !color || !plate || !capacity || !vehicleType) {
        throw new Error("All fields are requireddddddd");
    } else {
        const captain = await captainmodel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password,

            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });

        return captain;
    }
}