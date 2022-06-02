
const mongoose = require('../connection');


const FeaturedPlaylistSchema = new mongoose.Schema({
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




const FeaturedPlaylist = new mongoose.model('FeaturedPlaylist', FeaturedPlaylistSchema);
module.exports = FeaturedPlaylist;