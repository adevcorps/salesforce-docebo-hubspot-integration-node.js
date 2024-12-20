const axios  = require('axios');
require('dotenv').config();

let accessToken = null;
let tokenExpiryTime = null;
let tokenType = null;

const TOKEN_URL = process.env.DOCEBO_API_SUB_DOMAIN
const CLIENT_NAME = process.env.DOCEBO_API_CLIENT_NAME
const CLIENT_SECRET = process.env.DOCEBO_API_CLIENT_SECRET
const GRANT_TYPE = process.env.DOCEBO_API_GRANT_TYPE
const API_SCOPE = process.env.DOCEBO_API_SCOPE
const USER_NAME = process.env.DOCEBO_API_USER_NAME
const PASSWORD = process.env.DOCEBO_API_PASSWORD
const REFRESH_INTERVAL = 50 * 60 * 1000;

async function fetchAccessToken(){
    try{
        const response = await axios.post(
            TOKEN_URL,
            new URLSearchParams({
                grant_type: GRANT_TYPE,
                client_id: CLIENT_NAME,
                client_secret: CLIENT_SECRET,
                scope: API_SCOPE,
                username: USER_NAME,
                password:PASSWORD
            }),
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        );
        accessToken = response.data.access_token;
        tokenExpiryTime = Date.now() + response.data.expires_in * 1000;
        tokenType = Date.now() + response.data.token_type;
        console.log('New access token fetched:', accessToken);
        return accessToken;
    } catch(error){
        console.log('Error fetching access token in accessToken.js: ', error.response?.data || error.message);
        throw new Error('Failed to fetch acess token')
    }
}

async function getAccessToken() {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 1000;
    let retries = 0;

    while( (!accessToken || Date.now() > tokenExpiryTime) && retries < MAX_RETRIES ) {
        console.warn('Access token expired or not fetched yet');
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
        retries ++;
    }
    if (!accessToken || Date.now() > tokenExpiryTime) {
        throw new Error('Access token is not available after retries');
    }
    return accessToken;
}

async function startTokenRefresh(){
    await fetchAccessToken();
    setInterval( async () => {
        try {
            await fetchAccessToken();
        } catch (error) {
            console.error('Failed to refresh access token: ', error.message);
        }
    }, REFRESH_INTERVAL)
}

module.exports = {
    startTokenRefresh,
    getAccessToken,
    fetchAccessToken
}