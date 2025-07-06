const mongoose = require("mongoose");
const BlacklistTokenSchema = new mongoose.Schema(
    {

        token: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 86400 // Automatically remove documents after 1 day
        }
    }
);

BlacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const blacklistTokenModel = mongoose.model("BlacklistToken", BlacklistTokenSchema);
module.exports = blacklistTokenModel;
