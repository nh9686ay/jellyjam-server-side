
const mongoose = require('../connection');


const PlaylistSchema = new mongoose.Schema({
    description: String,
    external_url: String,
    SPId: String,
    image_url: String, //item.images[0].url
    name: String,
    owner: {
        name: String, //item.owner.display_name
        url: String,  //item.owner.external_urls.spotify
    },
    totalTracks: Number, //find in item.tracks.total
})




const Playlist = new mongoose.model('Playlist', PlaylistSchema);
module.exports = Playlist;