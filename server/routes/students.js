const express = require('express');
const { handleErrors, listCollection } = require('../utils/express');
const router = express.Router();

router.get('/', handleErrors(async (req, res) => {
    res.send('Student Api route');
}));

module.exports = router;