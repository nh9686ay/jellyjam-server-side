const express = require("express");

// const Router = require("./routes")

//CONTROLLERS
const userController = require("./controllers/users")


const app = express();

app.use(express.json());




// app.use(Router);

app.use('/user', userController);


app.listen(4000, () => {
  console.log("Server is running at port 4000");
});