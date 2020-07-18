const metodosBD = require("./../services/feedbackService");
const jwt = require("./../helpers/jwt");

//chama o serviço que mostra todos os comentarios
exports.mostrarFeedBack = (req, res) => {
    metodosBD.mostrarFeedBack()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

//chama o serviço que mostra todos os comentarios em relação a um ficheiro
exports.mostrarFeedBackFicheiro = (req, res) => {
    metodosBD.mostrarFeedBackFicheiro(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que vai inserir um novo comentario
exports.inserirFeedBack = (req, res) => {
    metodosBD.inserirFeedBack(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//apaga todos os comentario
exports.apagarFeedBack = (req, res) => {
    metodosBD.apagarFeedBack()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}