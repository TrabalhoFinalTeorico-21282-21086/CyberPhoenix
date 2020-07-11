const metodosBD = require("./../services/fileService");


exports.mostrarFicheiroDeUmUser = (req, res) => {
    metodosBD.mostrarFicheiroDeUmUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.mostrarFicheirosCategorizados = (req, res) => {
    metodosBD.mostrarFicheirosCategorizados(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.mostrarFicheiros = (req, res) => {
    metodosBD.mostrarFicheiros()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.mostrarFicheiro = (req, res) => {
    metodosBD.mostrarFicheiroUnico(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.apagarFicheiros = (req, res) => {
    metodosBD.apagarFicheiros()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}