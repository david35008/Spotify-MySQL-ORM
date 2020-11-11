const { User } = require("../models");

module.exports = function checkAdmin(req, res, next) {
    User.findOne({
        where: { email: req.decoded.email },
    }).then((user) => {
        if (user.isAdmin) {
            next();
        } else {
            res.sendStatus(401);
        }
    });
};
