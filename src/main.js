const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const api = require('./api');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use (express.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, Referer, User-Agent, Origin');
    next();
});
app.use(api);

async function start(){
    try {
        await mongoose.connect('mongodb://localhost/plankton-app',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    }catch (e) {
        console.log(e)
    }
}

start();