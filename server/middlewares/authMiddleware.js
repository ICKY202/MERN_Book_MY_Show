const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifiedToken = jwt.verify(token, process.env.jwt_secret);
        req.body.user = verifiedToken.userId;
        next();
    }catch(err) {
        res.send({success: false, message: "Unauthorized user"});
    }
    
}