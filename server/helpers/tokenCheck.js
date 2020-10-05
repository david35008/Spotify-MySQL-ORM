require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

Array.prototype.remove = function () {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

module.exports = async function (req, res, next) {
  const refreshToken = req.headers['authorization'];
  const accessToken = req.headers['accesstoken'];
  // if (typeof refreshToken !== 'undefined') {
  // jwt.verify(accessToken, process.env.ACCESS_KEY, async (error, decodedAccess) => {
  //   if (error) {
  //     jwt.verify(refreshToken, process.env.REFRESH_KEY, async (error, decodedRefresh) => {
  //       if (error) {
  //         return res.status(403).json({ message: error });
  //       }

  //       const json = await fs.readFile('../refreshedTokens.json');
  //       const tokensArray = JSON.parse(json);
  //       if (tokensArray.includes(refreshToken)) {
  //         const newAccessToken = {
  //           isAdmin: decodedRefresh.isAdmin,
  //           user: decodedRefresh.user,
  //           userId: decodedRefresh.userId,
  //           exp: Math.floor(Date.now() / 1000) + (60 * 15)
  //         }
  //         const newAccessTokenSign = jwt.sign(newAccessToken, process.env.ACCESS_KEY);
  //         res.cookie('accessToken', newAccessTokenSign);
  //       } else {
  //         return res.status(403).json({ message: 'your token is expired' });
  //       }
  //     })
  //   }
  //   let refreshTokenDecoded = jwt.decode(refreshToken);
  //   if (!refreshTokenDecoded.rememberToken) {
  //     const newRefreshToken = {
  //       isAdmin: refreshTokenDecoded.isAdmin,
  //       user: refreshTokenDecoded.user,
  //       userId: refreshTokenDecoded.userId,
  //       exp: Math.floor(Date.now() / 1000) + (60 * 30)
  //     }
  //     const newRefreshTokenSign = jwt.sign(newRefreshToken, process.env.REFRESH_KEY);

  //     const json = await fs.readFile('../refreshedTokens.json');
  //     const tokensArray = JSON.parse(json);
  //     tokensArray.remove(refreshToken);
  //     tokensArray.push(newRefreshTokenSign);
  //     await fs.writeFile('../refreshedTokens.json', JSON.stringify(tokensArray, null, 2));

  //     res.cookie('refreshToken', newRefreshTokenSign);
  //   };
  let decoded = jwt.decode(refreshToken);
  console.log(decoded);
  req.decoded = decoded
  next();
  // })
  // } else {
  //   res.status(403).json({ message: 'tokens are requierd' });
  // }
}