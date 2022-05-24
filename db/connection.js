
const mongoose = require("mongoose");


mongoose.connect(
    `mongodb+srv://nh9686ay:Hitman95@cluster0.0pdjw.mongodb.net/Spotify?retryWrites=true&w=majority`, 
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

  module.exports = mongoose