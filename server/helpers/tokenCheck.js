require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      jwt.verify(bearerHeader, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          res.status(403).json({ message: error });
        } else {
          const newToken = {
            isAdmin: decoded.isAdmin,
            user: decoded.user,
            userId: decoded.userId
          }
          if (!decoded.rememberToken) {
              newToken.exp = Math.floor(Date.now() / 1000) + (60 * 30)
          };
          const token = jwt.sign(newToken, process.env.SECRET_KEY);
          req.decoded = decoded
          res.cookie('token', token);
          next();
        }
      })
    } else {
      res.status(403).json({ message: 'token is requierd' });
    }
  }