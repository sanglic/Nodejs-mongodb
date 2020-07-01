const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/estaciones', (req, res) => {
    res.render('estaciones');
});

module.exports = router;