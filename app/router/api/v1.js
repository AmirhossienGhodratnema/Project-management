const express = require('express');
const route = express.Router();


route.get('/', (req, res) => {
    return res.json({
        name: 'Version : 1',
    });
});


module.exports = { route };