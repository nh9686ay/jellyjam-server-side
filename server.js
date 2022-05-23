const express = require("express");
const mongoose = require("mongoose");
// const Router = require("./routes")

const app = express();

app.use(express.json());



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

// app.use(Router);

app.listen(4000, () => {
  console.log("Server is running at port 4000");
});