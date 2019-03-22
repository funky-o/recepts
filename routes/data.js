const express = require('express');
const controller = require('../controllers/data');

const router = express.Router();

router.get('/getRecepts', controller.getRecepts);
router.get('/getRecept', controller.getReceptId);

module.exports = router;