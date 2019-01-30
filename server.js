const querystring = require('querystring');
const express = require('express')
const https = require('https');
const request = require('request');
const morgan = require('morgan');
const path = require('path');
const app = express()
const port = 4000;

require('dotenv').config();

const idCLient = process.env.CLIENT_ID;
const isProd = process.env.ENV === 'prod';
const prodPrefix = isProd ? '' : 'dist/';

const body = {
    client_id: idCLient,
    client_secret: process.env.CLIENT_SECRET
};

const authOptions = {
  hostname: 'github.com',
  path: '/login/oauth/access_token',
  method: 'POST',
  headers: {
      'User-Agent': 'alexandressh',
      'accept': 'application/json'
  }
};

const options = {
    url: 'https://api.github.com',
    headers: {}
};

app.use(morgan('tiny'));


app.get('/api/access_token/:code', (req, res) => {
    const code = req.params.code;
    const bodyString = querystring.stringify({...body, code: code});
    let chunks = '';

    const reqProxy = https.request(authOptions, (resProxy) => {
        resProxy.on('data', (d) => {
          chunks += d;
        });

        resProxy.on('end', () => {
            res.send(JSON.parse(chunks));
        });
      });

      
      reqProxy.on('error', (e) => {
        console.error(e);
        res.send(e);
      });
      
      reqProxy.write(bodyString)
      reqProxy.end();
});

app.use('/api/login_url', (req, res) => {
    const data = {
        url: `https://github.com/login/oauth/authorize?scope=user:email&client_id=${idCLient}`
    }
    res.send(data);
});

app.use('/api', (req, res) => {
    const url = `${options.url}${req.url}`;
    const headers = {
        'authorization': req.headers['authorization'],
        'user-agent': 'alexandressh'
    };
    const options = {...options, url};
    options.headers = headers;

    request(options).pipe(res);
});

app.use('/', express.static(`${prodPrefix}github-integration`));
app.use('/callback', express.static(`${prodPrefix}github-integration`));
app.use('/home', express.static(`${prodPrefix}github-integration`));

app.listen(port, () => {
    console.log(`App rodando na porta ${port}!`);
    console.log(`Modo ${isProd ? 'PRODUCAO': 'DEV'}!`)
});