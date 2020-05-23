const metodosBD = require("./../services/userService");
const jwt = require("./../helpers/jwt");



exports.registar = (req, res) => {
    metodosBD.registar(req.body)
        .then(payload => jwt.createToken(payload))
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.autenticar = (req, res) => {
    metodosBD.autenticar(req.body)
        .then(payload => jwt.createToken(payload))
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.mostrarUsers = (req, res) => {
    metodosBD.mostrarUsers()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.mostrarUserUnico = (req, res) => {
    metodosBD.mostrarUserUnico(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.apagarTudo = (req, res) => {
    metodosBD.apagartudo()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
