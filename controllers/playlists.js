
const express = require('express');

const Playlist = require('../db/models/playlistModel');

const router = express.Router();



router.get('/', (req, res) => {
    Playlist.find()
        .then((playlists) => {
            res.json(playlists)
        })
        .catch(console.error);
})







module.exports = router;