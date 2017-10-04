const router = require('express').Router();
var Promise = require('bluebird');

const { Place, Activity, Restaurant, Hotel } = require('../models');

router.get('/attractions', (req, res, next) => {
  Promise.all([
    Activity.findAll( { include: [ Place ] } ),
    Restaurant.findAll( { include: [ Place ] } ),
    Hotel.findAll( { include: [ Place ] } )
  ])
    .then(([hotels, restaurants, activities]) =>
      res.json({hotels, restaurants, activities}))
    .catch(next);
});

module.exports = router;
