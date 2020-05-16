const metodosBD = require("./../services/upDownService");

exports.teste = (req, res) => {
    metodosBD.testePromise()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.inserirFicheiro = (req, res) => {
    metodosBD.inserirFicheiro(req.params.id, req.body, req.files)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}

exports.downloadFicheiro = (req, res) => {
    res.download(__dirname + "/../files/" + req.params.id, (err) => {
        if (err) console.log("ocorreu um erro no download");
        else console.log("download com sucesso");
    });
}