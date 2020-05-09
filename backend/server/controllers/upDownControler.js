const metodosBD = require("./../services/upDownService");

exports.teste = (req, res) => {
    metodosBD.testePromise()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.mostrarFicheiros = (req, res) => {
    metodosBD.mostrarFicheiros()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.inserirFicheiroImaginario = (req, res) => {
    metodosBD.inserirFicheiroImaginario(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.inserirFicheiro = (req, res) => {
    metodosBD.inserirFicheiro(req.params.id, req.body, req.files)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}