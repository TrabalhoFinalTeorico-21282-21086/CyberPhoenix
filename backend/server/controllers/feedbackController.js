const metodosBD = require("./../services/feedbackService");
const jwt = require("./../helpers/jwt");


exports.mostrarFeedBack = (req, res) => {
    metodosBD.mostrarFeedBack()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.mostrarFeedBackFicheiro = (req, res) => {
    metodosBD.mostrarFeedBackFicheiro(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.inserirFeedBack = (req, res) => {
    metodosBD.inserirFeedBack(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.apagarFeedBack = (req, res) => {
    metodosBD.apagarFeedBack()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}