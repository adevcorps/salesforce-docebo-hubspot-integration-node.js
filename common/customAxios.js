const axios = require('axios')
const tokenManager = require("./accessToken");
// const accessTokenManager = require("./common/accessToken");


module.exports = async function getApiData (method, url, payload) {
    let accessToken = await tokenManager.fetchAccessToken();
    console.log("***********************");
    console.log(accessToken, method, url);
    console.log("***********************");
    return;
    try {
        axios({
            method: method,
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 200) {
                return {
                    status: '200',
                    data:"error"
                };
            } else {
                return {
                    status: '400',
                    data: 'status_error'
                };
            }
        })       
    } catch (error) {
        return {
            status: '505',
            data: error.response?.data || error.message
        }
    }
} 