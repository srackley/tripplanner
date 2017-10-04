const express = require('express');
const router = express.Router();
const models = require('../models')
var Promise = require("bluebird");

const {Place} = models;
const {Activity} = models;
const {Restaurant} = models;
const {Hotel} = models;
var all = [];
router.get('/api', (req, res, next)=>{
  Promise.all([Hotel, Restaurant, Activity]).then((values) => {
    values.forEach(el => {

      el.findAll({}).then(results => {
        console.log(all);
        // console.log(results);
        all.push(results) })
    })

    return all;
  }).then( every => res.json(every[2]));

//  Hotel.findAll({}).then((results)=>{
//    all.hotel = results;
//  })
})

module.exports = router;
