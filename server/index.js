// Environment variables from .env
require('dotenv').config();

const ClientOAuth2 = require('client-oauth2');
const CryptoJS = require('crypto-js');

const VIPPS_API_URL = process.env.REACT_APP_VIPPS_TEST_API_URL;
const VIPPS_CLIENT_ID = process.env.REACT_APP_VIPPS_CLIENT_ID;
const VIPPS_CLIENT_SECRET = process.env.REACT_APP_VIPPS_CLIENT_SECRET;

console.log({ VIPPS_CLIENT_ID, VIPPS_CLIENT_SECRET });

const wordArrayAzp = CryptoJS.enc.Utf8.parse(
    VIPPS_CLIENT_ID + ':' + VIPPS_CLIENT_SECRET,
);
const client_authorization = CryptoJS.enc.Base64.stringify(wordArrayAzp);

const client = new ClientOAuth2({
    clientId: VIPPS_CLIENT_ID,
    clientSecret: VIPPS_CLIENT_SECRET,
    accessTokenUri:
        VIPPS_API_URL + '/access-management-1.0/access/oauth2/token',
    authorizationUri:
        VIPPS_API_URL + '/access-management-1.0/access/oauth2/auth',
    redirectUri: 'http://localhost:3000/vipps/redirect',
    responseType: 'code',
    scopes: [
        'name',
        'address',
        'birthDate',
        'email',
        'phoneNumber',
        'api_version_2',
    ],
    state: 'test1234',
});

const app = require('express')();
const server = require('http').Server(app);

const PORT = 8080;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header(
        'Access-Control-Allow-Headers',
        'Accept, Authorization, Content-Type, X-Requested-With, Range',
    );
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.get('/login/auth', function (req, res) {
    const redirectURI = client.code.getUri();
    res.send(redirectURI);
});

app.get('/login/token', function (req, res) {
    const code = req.query.code;
    const tokenPromise = client.code.getToken(
        `/vipps/redirect?state=${'test1234'}&code=${code}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${client_authorization}`,
            },
            body: new URLSearchParams({
                client_id: VIPPS_CLIENT_ID,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:3000/vipps/redirect',
                code: code,
            }),
        },
    );
    tokenPromise
        .then((token) => {
            res.send(token.data);
        })
        .catch((error) => {
            res.status(401);
            res.send(error);
        });
});

app.get('/user', function (req, res) {});

console.log(`Server running on localhost:${PORT}`);
server.listen(PORT);
