const metodosBD = require("./../services/subscriptionService");
const jwt = require("./../helpers/jwt");


exports.inserirSubscricao = (req, res) => {
    metodosBD.inserirSubscricao(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
}

exports.apagarSubscricao = (req, res) => {
    metodosBD.apagarSubscricao(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
}

exports.existeSubscricao = (req, res) => {
    metodosBD.existeSubscricao(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
}

exports.mostrarSubscricoes = (req, res) => {
    metodosBD.mostrarSubscricoes()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.mostrarQuemSubscreveu = (req, res) => {
    metodosBD.mostrarQuemSubscreveu(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.mostrarQuemFoiSubscrito = (req, res) => {
    metodosBD.mostrarQuemFoiSubscrito(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.apagarTodas = (req, res) => {
    metodosBD.apagarTodas()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}