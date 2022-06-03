
const express = require('express');
const cors = require('cors');
const axios = require('axios');


const FeaturedPlaylist = require('../db/models/featuredPlaylistModel');
const Playlist = require('../db/models/playlists');
const router = express.Router();

router.use(cors());


// make into env vars
const client_id = '638824d8d1cf48bca579d7fa24c5ac40';
const client_secret = 'cb118a82d49d4d51b6f2e5ecefed9085';


router.get('/', (req, res) => {
    Playlist.find()
        .then((playlists) => {
            res.json(playlists)
        })
        .then(console.log(res.json))
        .catch(console.error);
})


router.get('/featured', (req, res) => {
    const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        const result = axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': "application/x-www-form-urlencoded"
            },
        })
        .then((playlist) => {

            const token = playlist.data.access_token
            axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    // q: searchKey,
                    // type: 'album'
                }
            })
            .then(result => {
    
                FeaturedPlaylist.deleteMany({})
                    .then(() => {
                        for(let i = 0; i < result.data.playlists.items.length; i++) {

                            FeaturedPlaylist.insertMany({
                                description: result.data.playlists.items[i].description,
                                external_url: result.data.playlists.items[i].external_urls.spotify,
                                SPId: result.data.playlists.items[i].id,
                                image_url: result.data.playlists.items[i].images[0].url,
                                name: result.data.playlists.items[i].name,
                                owner: {
                                    name: result.data.playlists.items[i].owner.display_name, //item.owner.display_name
                                    url: result.data.playlists.items[i].owner.external_urls.spotify,  //item.owner.external_urls.spotify
                                },
                                totalTracks: result.data.playlists.items[i].tracks.total,
                            })
                            .then(() => {
                                console.log('added playlists')
                            })
                            .catch(console.error)
                        }
                    })
                    .catch(console.error)
            })
            .catch(console.error)
        })
        .then(() => {
            FeaturedPlaylist.find()
            .then((playlists) => {
                res.json(playlists)
            })
            .catch(console.error)
        })
        .catch(console.error)
    
})



router.get('/playlistlibrary', (req, res) => {
    Playlist.find()
        .then((playlists) => {
            res.json(playlists)
        })
        .catch(console.error)
})

router.get('/playlistbyid/:id', (req, res) => {
    const id = req.params.id
    Playlist.findById(id)
        .then(playlist => {
            res.json(playlist)
            console.log(playlist)
        })
        .catch(console.error)
})



router.get('/searchsong/:id', (req, res) => {
    const searchKey = req.params.id

    const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        const result = axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': "application/x-www-form-urlencoded"
            },
        })
        .then((playlist) => {

            const token = playlist.data.access_token
            axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    q: searchKey,
                    type: "track"
                }
            })
            .then((song) => {
                res.json(song.data.tracks.items[0])
            })
            .catch(console.error);
        })
        .catch(console.error);
})


router.post('/createplaylist', (req, res) => {
    Playlist.create({
        description: req.body.des,
        image_url: req.body.image_url,
        name: req.body.name
    })
        .then((playlist) => {
            res.json(playlist)
            console.log(playlist)
        })
        .catch(console.error)
})

router.delete('/deleteplaylist/:id', (req, res) => {
    const id = req.params.id
    Playlist.deleteOne({ _id: id })
        .then(playlist => {
            console.log(playlist)
        })
        .catch(console.error)
})



module.exports = router;