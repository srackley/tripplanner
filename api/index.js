const router = require('express').Router();
var Promise = require('bluebird');

const { Place, Activity, Restaurant, Hotel } = require('../models');

router.get('/attractions', (req, res, next) => {
  Promise.all([
    Activity.findAll( { include: [ Place ] } ),
    Restaurant.findAll( { include: [ Place ] } ),
    Hotel.findAll( { include: [ Place ] } )
  ])
    .then(results => {
      var obj = {
        Activity: results[0],
        Restaurant: results[1],
        Hotel: results[2]
      };
      res.json(obj);
    });
});

module.exports = router;
