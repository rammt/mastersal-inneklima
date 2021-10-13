import ClientOAuth2 from 'client-oauth2';

const VIPPS_API_URL = process.env.REACT_APP_VIPPS_API_URL;
const VIPPS_CLIENT_ID = process.env.REACT_APP_VIPPS_CLIENT_ID;
const VIPPS_CLIENT_SECRET = process.env.REACT_APP_VIPPS_CLIENT_SECRET;

export default class VippsService {
    static getRedirectURI() {
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
                'email',
                'phoneNumber',
                'birthDate',
                'api_version_2',
            ],
            state: 'test1234',
        });

        return client.code.getUri();
    }

    static get;
}
