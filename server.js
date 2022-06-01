const express = require("express");

// const Router = require("./routes")

//CONTROLLERS
const userController = require("./controllers/users")
const playlistsController = require("./controllers/playlists")


const app = express();

app.use(express.json());


app.get('/favicon.ico', (req, res) => {
    // console.log('favicon')
})

// app.use(Router);

app.use('/user', userController);
app.use('/playlist', playlistsController);

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});