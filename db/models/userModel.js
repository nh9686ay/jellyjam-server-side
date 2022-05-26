
const mongoose = require('../connection');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String, 
    lastName: String,
    age: Number,
    gender: String,
    profileImg: String,
    playlists: Array,
    likedSongs: Array,
    followedArtists: Array,
})

const User = new mongoose.model('User', UserSchema);
module.exports = User;