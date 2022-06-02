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

router.post('/login', (req, res) => {

    User.find({email: req.body.email, password: req.body.password})
        .then((user) => {
            res.json(user)
        })
        .catch(console.error)
})

router.post('/signup', (req, res) => {

    User.create({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password    
    })
        .then((user) => {
            res.json(user)
        })
        .catch(console.error)
})



module.exports = router;