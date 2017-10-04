const express = require("express")
const app = express();
var Promise = require("bluebird");

const bodyParser = require("body-parser")
const morgan = require("morgan")
const sequelize = require("sequelize")
const path = require("path")
const db = require("../models").db
const routes = require('../api/attractions');
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.listen(3000, ()=> {
    console.log("I am listening at 3000")
    db.sync().then(()=>{
        console.log("Synchronated the database")
    }).catch(()=>{
        console.log("Trouble right here in the River City", err, err.stack)
    })
})
app.use(routes);
//---err-------

app.use((req, res, next)=>{
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use( (err, req,res,next) => {
    res.status(err.status || 500)
    console.error(err)
    res.send(
        "error happened"
    )
})
