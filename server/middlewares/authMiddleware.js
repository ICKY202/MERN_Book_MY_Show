const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const verifiedToken = jwt.verify(token, process.env.jwt_secret);
        console.log(verifiedToken);
        req.body.user = verifiedToken.userId;
        next();
    }catch(err) {
        res.send({success: false, message: "Unauthorized user"});
    }
    
}