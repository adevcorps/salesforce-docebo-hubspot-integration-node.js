const axios = require('axios')
const tokenManager = require("./accessToken");
// const accessTokenManager = require("./common/accessToken");


module.exports = async function getApiData (method, url, payload) {
    let accessToken = await tokenManager.fetchAccessToken();
    console.log("***********************");
    console.log(accessToken, method, url);
    console.log("***********************");
    try {
        const response = await axios({
            method: method,
            url: url,
            data: payload,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        return response.data.data;       
    } catch (error) {
        return {
            status: '505',
            data: error.response?.data || error.message
        }
    }
} 