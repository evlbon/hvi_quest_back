const express = require('express');
const mongoose = require('mongoose');

const fs = require('fs');
const http = require('http');
const https = require('https');
require('dotenv').config();

const api = require('./api');


const app = express();

app.use(express.static(__dirname, { dotfiles: 'allow' } ));

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


const httpServer = http.createServer(app);

async function start(){
    try {
        await mongoose.connect('mongodb://localhost/hiv',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        httpServer.listen(80, () => {
            console.log('HTTP Server running on port 80');
        });


        try {
            const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
            const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
            const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

            const credentials = {
                key: privateKey,
                cert: certificate,
                ca: ca
            };

            const httpsServer = https.createServer(credentials, app);
            httpsServer.listen(443, () => {
                console.log('HTTPS Server running on port 443');
            });
        }catch (e) {
            console.log(e);
        }
    }catch (e) {
        console.log(e)
    }
}

start();