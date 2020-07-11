const metodosBD = require("../services/upDownService");

exports.inserirFicheiro = (req, res) => {
    metodosBD.inserirFicheiro(req.params.id, req.body, req.files)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.modificarFicheiro = (req, res) => {
    metodosBD.modificarFicheiro(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.apagarFicheiro = (req, res) => {
    metodosBD.apagarFicheiro(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.downloadFicheiro = (req, res) => {
    res.download(__dirname + "/../files/" + req.params.id, (err) => {
        if (err) console.log(err.message);
    });
}