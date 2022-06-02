const mongoose = require('../connection');


const PlaylistSchema = new mongoose.Schema({
    description: String,
    external_url: String,
    SPId: String,
    image_url: String,
    name: String,
    owner: {
        name: String,
        url: String,
    },
    totalTracks: Number, 
})




const Playlist = new mongoose.model('Playlist', PlaylistSchema);
module.exports = Playlist;