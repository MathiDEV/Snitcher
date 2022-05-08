const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(401).json({ "error": 'No token, authorization denied' });

    jwt.verify(auth.split(' ')[1], process.env.SECRET, (err, decoded) => {
        if (err)
            return res.status(401).json({ "error": 'Token is not valid' });
        req.address = decoded['address'];
        req.id = decoded['id'];
        next();
    });
}

module.exports = auth;