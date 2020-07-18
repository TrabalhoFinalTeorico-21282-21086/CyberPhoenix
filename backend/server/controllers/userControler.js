const metodosBD = require("./../services/userService");
const jwt = require("./../helpers/jwt");


//chama o serviço que regista um novo utilizador 
exports.registar = (req, res) => {
    metodosBD.registar(req.body)
        .then(payload => jwt.createToken(payload))
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que modifica um utilizador 
exports.modificar = (req, res) => {
    metodosBD.modificar(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que autentica um utilizador 
exports.autenticar = (req, res) => {
    metodosBD.autenticar(req.body)
        .then(payload => jwt.createToken(payload))
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que apaga um utilizador 
exports.apagarEspecifico = (req, res) => {
    metodosBD.apagarEspecifico(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que mostra todos os utilizadores 
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
