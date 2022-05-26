const express = require("express");

// const Router = require("./routes")

//CONTROLLERS
const userController = require("./controllers/users")


const app = express();

app.use(express.json());




// app.use(Router);

app.use('/user', userController);

const port = 5005;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});