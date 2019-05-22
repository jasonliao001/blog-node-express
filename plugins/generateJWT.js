const JWT = require('jsonwebtoken');
exports.createToken = jwtInfo => {
  const generateJWT = jwtInfo => {
    const payload = {
      userId: jwtInfo.userId || jwtInfo._id,
      exp: Math.floor(Date.now() / 1000) + 60 * 4 // 签发一条 4 分钟后失效的 JWT
    };
    return JWT.sign(payload, process.env.JWT_SECRET);
  };
  const token = generateJWT(jwtInfo);
  return token;
  //   res.append('Authorization', token);
};
