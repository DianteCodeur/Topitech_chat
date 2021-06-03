const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Le serveur est up et lancé');
});

module.exports = router;