const axios = require('axios');
const qs = require('qs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userDao  = require('../models/userDao');

const GRANT_TYPE = process.env.GRANT_TYPE;
const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;

const getKakaoAccessToken = async(authorizationCode) => {

  return await axios({
    method: 'post',
    url: 'https://kauth.kakao.com/oauth/token',
    headers: {'Content-type':'application/x-www-form-urlencoded;charset=utf-8'},
    data: qs.stringify({
      grant_type: GRANT_TYPE,
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: authorizationCode
    })
  }).then((response) => response.data)
};

const getKakaoUserInfo = async(kakaoAccessToken) => {

  return await axios({
    method: 'get',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {'Content-type':'application/x-www-form-urlencoded;charset=utf-8', 'Authorization':`Bearer ${kakaoAccessToken}`}
  }).then((response) => response.data);
};

const saveUserInfo = async(kakaoId, name, profileImage, email, birthday, phoneNumber, DEFAULT_POINT) => {

  return await userDao.createUser(kakaoId, name, profileImage, email, birthday, phoneNumber, DEFAULT_POINT);
};

const updateUserInfo = async(kakaoId, name, profileImage) => {
  const user = await userDao.getUserByKaKaoId(kakaoId);

  if (!user) {
    const error = new Error(`USER_DOES_NOT_EXIST`);
    error.statusCode = 401;

    throw error
  }

  const update = await userDao.updateUserInfo(kakaoId, name, profileImage);
  return update;
}

const getUserByKaKaoId = async(kakaoId, name, profileImage, email, birthday, phoneNumber, DEFAULT_POINT) => {
  let user = await userDao.getUserByKaKaoId(kakaoId);

  if (!user) {
    await saveUserInfo(kakaoId, name, profileImage, email, birthday, phoneNumber, DEFAULT_POINT);
    user = await userDao.getUserByKaKaoId(kakaoId);
  }

  if (user) {
    await updateUserInfo(kakaoId, name, profileImage);
  }

  const accessToken = jwt.sign({userId: user.userId}, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return accessToken;
};

const getUserById = async(id) => {
  return await userDao.getUserById(id);
};

module.exports = {
  getKakaoAccessToken,
  getKakaoUserInfo,
  getUserByKaKaoId,
  getUserById
}
