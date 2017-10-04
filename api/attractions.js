const express = require('express');
const router = express.Router();
const models = require('../models')
const {Place} = models;
const {Activity} = models;
const {Restaurant} = models;
const {Hotel} = models;

router.get('/api', (req, res, next)=>{

})

module.exports = router;
