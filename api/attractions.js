const express = require('express');
const router = express.Router();
const models = require('../models')
var Promise = require("bluebird");

const {Place} = models;
const {Activity} = models;
const {Restaurant} = models;
const {Hotel} = models;
var all = [];

router.get('/api/attractions', (req, res, next)=>{
  Promise.all([Activity.findAll({include: [ Place ]}), Restaurant.findAll({include: [ Place ]}),Hotel.findAll({include: [ Place ]})])
    .then( results => {
      console.log("-----",typeof results[0])
      var obj = {
        Activity: results[0],
        Restaurant: results[1],
        Hotel: results[2]
      }
      res.json(obj)
    })
})

module.exports = router;
