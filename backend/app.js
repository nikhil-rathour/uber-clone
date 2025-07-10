const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const app = express()
const cors = require("cors");
const connectToDB = require("./db/db");
const cookieParser = require("cookie-parser")
const mapsRoutes = require("./routes/maps.route")

const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.route")
const rideRoutes = require("./routes/ride.routes")

connectToDB()


app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/users", userRoutes)
app.use(express.urlencoded({extended: true}))
app.use("/captains", captainRoutes)
app.use("/maps", mapsRoutes)
app.use("/rides", rideRoutes)

app.get("/" , (req,res)=>{
    res.send("heloooo")
})

module.exports  = app