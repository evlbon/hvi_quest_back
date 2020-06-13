const jwt = require('jsonwebtoken');

module.exports.authenticateToken = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, params) => {
        if (err) return res.sendStatus(403);
        req.params = params;
        next()
    })
};


module.exports.generateAccessToken = function generateAccessToken(params) {
    return jwt.sign(params, process.env.ACCESS_TOKEN_SECRET, {})

    // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
};
