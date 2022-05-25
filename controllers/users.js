const express = require('express');

const User = require('../db/models/userModel');

const router = express.Router();

const newUser = {
    email: 'benmorgiewicz@gmail.com',
    userName: 'ben',
    password: 'benjiball123',
    likes: ['space song', 'time out', 'A man without love']
}


router.get('/', (req, res) => {
    User.find()
        .then((users) => {
            res.json(users)
        })
})

router.get('/login', (req, res) => {
    User.find()
        .then((users) => {
            res.json(users)
        })
        .catch(console.error)
})

router.post('/signup', (req, res) => {
    // console.log(req)
    // console.log(res)
    User.create({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
        // email: req.email,
        // userName: req.userName,
        // password: req.password,
        // likedSongs: req.likes
    })
        .then((user) => {
            res.json(user)
            // console.log(req)
            // console.log(res)
        })
        .catch(console.error)
})



module.exports = router;