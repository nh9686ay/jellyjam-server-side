
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
    // `mongodb+srv://nh9686ay:Hitman95@cluster0.0pdjw.mongodb.net/Spotify?retryWrites=true&w=majority`, 
    process.env.DB_URL, 
    {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });


//   const mongoose = require("mongoose");
// require('dotenv').config();
// const mongoURI = 
//     process.env.NODE_ENV === 'production'
//     ? process.env.DB_URL
//     // if your atlas db
//     // : process.env.DEV_DB_URL
//     : 'mongodb+srv://nh9686ay:Hitman95@cluster0.0pdjw.mongodb.net/Spotify?retryWrites=true&w=majority'

// mongoose.connect(mongoURI)
//     .then(instance => console.log(`connected to: ${instance.connections[0].name}`))
//     .catch(error => console.log(`failed conn:`, error))


  module.exports = mongoose