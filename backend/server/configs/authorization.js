const jwt = require("../helpers/jwt");

module.exports = (...roles) => {
    return (req, res, next) => {
        if (req.headers.authorization) {
            jwt.validateToken(req.headers.authorization)
                .then((payload) => {
                    if (roles.some((r) => r == payload.role)) {
                        req.client = payload._id;
                        next();
                    }
                    else res.status(401).send("Not allowed");
                })
                .catch((error) => res.status(401).send(error.message));
        }
        else return res.status(401).send("Authorization header undefined");
    }
}