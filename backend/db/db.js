const  mongoose = require("mongoose")
 
 function connectToDB() {
       mongoose.connect(process.env.DB_CONNECT)
       .then(() => {
         console.log("connected to DB successfully")
         
       }).catch(err => console.log(err));
       

 }
 module.exports = connectToDB;

 // connectdb -> usermodel -> import to user.controller 