const metodosBD = require("../services/upDownService");
const mc = require("../bd/minIO");
//chama o serviço que insere um novo ficheiro na db
exports.inserirFicheiro = (req, res) => {
    metodosBD.inserirFicheiro(req.params.id, req.body, req.files)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que modifica um ficheiro na db
exports.modificarFicheiro = (req, res) => {
    metodosBD.modificarFicheiro(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que apaga um ficheiro na db
exports.apagarFicheiro = (req, res) => {
    metodosBD.apagarFicheiro(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//retorna o ficheiro para download
exports.downloadFicheiro = (req, res) => {
    res.download(__dirname + "/../files/" + req.params.id, (err) => {
        if (err) console.log(err.message);
    });

    /*mC.fGetObject('mybucket', 'photo.jpg', '/tmp/photo.jpg', function (err) {
        if (err) {
            return console.log(err)
        }
        console.log('success')
    }*/
}