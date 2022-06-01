
const express = require('express');
const cors = require('cors');
const axios = require('axios');


const Playlist = require('../db/models/playlistModel');

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
        .catch(console.error);
})


router.get('/fetchtest', (req, res) => {
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
    
                Playlist.deleteMany({})
                    .then(() => {
                        for(let i = 0; i < result.data.playlists.items.length; i++) {

                            Playlist.insertMany({
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
            Playlist.find()
            .then((playlists) => {
                res.json(playlists)
            })
            .catch(console.error)
        })
        .catch(console.error)
    
})






module.exports = router;