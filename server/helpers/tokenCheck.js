require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      jwt.verify(bearerHeader, process.env.SECRET_KEY, (error, data) => {
        if (error) {
          res.status(403).json({ message: error });
        } else {
          const newToken = {
            isAdmin: data.isAdmin,
            user: data.user,
            userId: data.userId
          }
          if (!data.rememberToken) {
              newToken.exp = Math.floor(Date.now() / 1000) + (60 * 30)
          };
          const token = jwt.sign(newToken, process.env.SECRET_KEY);
          req.isAdmin = data.isAdmin;
          req.userEmail = data.user;
          req.userId = data.userId;
          res.cookie('token', token);
          next();
        }
      })
    } else {
      res.status(403).json({ message: 'token is requierd' });
    }
  }