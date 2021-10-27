import ClientOAuth2 from 'client-oauth2';
import CryptoJS from 'crypto-js';
const axios = require('axios');

const VIPPS_API_URL = process.env.REACT_APP_VIPPS_TEST_API_URL;
const VIPPS_CLIENT_ID = process.env.REACT_APP_VIPPS_CLIENT_ID;
const VIPPS_CLIENT_SECRET = process.env.REACT_APP_VIPPS_CLIENT_SECRET;
const VIPPS_API_TOKEN_ENDPOINT =
    VIPPS_API_URL + '/access-management-1.0/access/oauth2/token';

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
    scopes: ['name', 'api_version_2'],
    state: 'test1234',
});

export default class VippsService {
    static getRedirectURI() {
        return client.code.getUri();
    }

    static getToken(code) {
        return client.code.getToken(
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
    }

    static getToken2(code) {
        console.log('Code:', code);
        console.log('client_authorization:', client_authorization);
        fetch(VIPPS_API_URL + '/access-management-1.0/access/oauth2/token', {
            method: 'POST',
            mode: 'no-cors',
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
        })
            .then((res) => {
                console.log('res:', res);
            })
            .catch((error) => console.error('Fuck you:', error));
    }

    static getToken3(code) {
        const request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST', VIPPS_API_TOKEN_ENDPOINT, true);

        request.setRequestHeader(
            'Access-Control-Allow-Origin',
            'http://localhost:3000',
        );
        request.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded; charset=UTF-8',
        );
        request.setRequestHeader(
            'Authorization',
            'Basic ' + client_authorization,
        );
        request.setRequestHeader('Accept', 'application/json');
        request.send(
            `client_id=${VIPPS_CLIENT_ID}&grant_type=${'authorization_code'}&code=${code}&redirect_uri=http://localhost:3000/vipps/redirect`,
        );

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                console.log(request.responseText);
            }
        };
    }

    static getToken4(code) {}
}
