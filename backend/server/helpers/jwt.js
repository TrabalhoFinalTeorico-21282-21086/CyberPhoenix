const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.JWT_KEY;


exports.createToken = (payload) => {
    return new Promise((resolve, reject) => {
        const options = { expiresIn: '8h', issuer: 'CyberPheonix' };
        jwt.sign(payload, key, options, (error, token) => {
            if (error) reject(error);
            else resolve({ token, ...payload });
        });
    });
}

exports.validateToken = (token) => {
    return new Promise((resolve, reject) => {
        let options = { issuer: 'CyberPheonix' };
        jwt.verify(token, key, options, (error, payload) => {
            if (error) reject(error);
            else resolve(payload);
        });
    });
}