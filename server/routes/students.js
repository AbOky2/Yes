const express = require('express');
const { handleErrors, listCollection } = require('../utils/express');
const router = express.Router();
const sameQueries = require('./utils')

router.get('/', handleErrors((req, res) => {
    res.send('Student Api route');
}));

sameQueries.forEach(({ name: { plural }, model }) => {
    router.get(`/${plural}`, listCollection(async ({ offset, limit }) => {
        console.log('okk')
        let { list } = await model.list({ offset, limit });
        list.sort((a, b) => a.position - b.position);
        return { list }
    }));
})
module.exports = router;