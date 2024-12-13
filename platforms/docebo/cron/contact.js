require('dotenv').config();
const getApiData = require('../../../common/customAxios');
const APP_BASE = process.env.DOCEBO_API_BASE_URL;

async function getUserList () {
    let userList = await getApiData('GET', `${APP_BASE}/manage/v1/user`, null);
}

async function getPendingUsers(){
    let pendingList = await getApiData('GET', `${APP_BASE}/manage/v1/user`, {pending:1});
    if(pendingList.total_count > 0) {
        console.log(pendingList);
    }
    
}

async function getUserInfo(userId){
    let userInfo = await getApiData('GET', `${APP_BASE}/manage/v1/user/${userId}`, null);
    return userInfo;
}

module.exports = {
    getUserList,
    getPendingUsers,
    getUserInfo
}

