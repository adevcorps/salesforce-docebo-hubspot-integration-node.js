require('dotenv').config();
const getApiData = require('../../../common/customAxios');
const APP_BASE = process.env.DOCEBO_API_BASE_URL;

module.exports  = async function getUserList () {
    let userList = await getApiData('GET', `${APP_BASE}/manage/v1/user`, null);
    console.log("======================")
    console.log(userList.data.items[0]);
}