const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { db } = require('../models');
const routes = require('../api');
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(morgan('dev'));

app.use(bodyParser.json());

db.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('I am listening at 3000');
        });
    }).catch(() => {
        console.log('Trouble right here in River City', err, err.stack);
});

app.use('/api', routes);

//---err-------

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err);
    res.send('Whoops! That page doesn\'t exist!');
});
