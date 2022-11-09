const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const signIn = catchAsync(async(req, res) => {

  const { authorizationCode } = req.query;
  
  if (!authorizationCode) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 401;
    
    throw error
  }

  const data = await userService.getKakaoAccessToken(authorizationCode);
  const kakaoAccessToken =  data['access_token'];
  const kakaoUserInfo = await userService.getKakaoUserInfo(kakaoAccessToken);
  const kakaoId = kakaoUserInfo['id'];
  
  if (!kakaoId) {
    const error = new Error('KAKAOID_IS_NOT_VALID');
    error.statusCode = 401;
    
    throw error
  }

  const name = kakaoUserInfo.properties['nickname'];
  const profileImage = kakaoUserInfo.properties['profile_image'];
  const email = kakaoUserInfo['kakao_account']['email'];
  const DEFAULT_POINT = 10000000;
  const birthday = null;
  const phoneNumber = null;

  const userInfo = await userService.getUserByKaKaoId(kakaoId, name, profileImage, email, birthday, phoneNumber, DEFAULT_POINT);

  res.status(200).json({'userInfo': userInfo });
});

module.exports = {
  signIn
}