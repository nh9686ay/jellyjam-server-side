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
    res.json({"users": ["ben", "emon", "alana", "jon'quil", "amber"]})
})

router.get('/login', (req, res) => {
    User.find()
        .then((users) => {
            res.json(users)
        })
        .catch(console.error)
})

router.post('/signup', (req, res) => {
    User.create({
        email: newUser.email,
        userName: newUser.userName,
        password: newUser.password,
        likedSongs: newUser.likes
    })
        .then((user) => {
            res.json(user)
        })
        .catch(console.error)
})



module.exports = router;