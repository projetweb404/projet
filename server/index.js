const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

const app = express();


app.use(bodyParser.urlencoded({extended: true})); // ?????
app.use(bodyParser.json());


app.use('/api/', apiRouter);
app.use('/', apiRouter);


app.listen(3333, () => {
    console.log("serveur en route ...");
})
