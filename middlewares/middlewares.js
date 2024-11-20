'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

const middlewares = {

    authenticateToken: (req, res, next) => {
        let eCommonResponse = {};
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = 'Access denied';
            return res.status(401).json(eCommonResponse);
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'Invalid token';
                return res.status(403).json(eCommonResponse);
            }
            req.user = user;
            next();
        });
    },


}


module.exports = middlewares;
