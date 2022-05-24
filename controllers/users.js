const express = require('express');

const User = require('../db/models/userModel');

const router = express.Router();



router.get('/', (req, res) => {
    res.json({name: 'ben', password: 'benjiball123', likes: ['space song', 'time out', 'A man without love']})
})

router.get('/login', (req, res) => {
    User.find()
        .then((users) => {
            res.json(users)
        })
})



module.exports = router;