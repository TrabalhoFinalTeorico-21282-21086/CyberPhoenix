const metodosBD = require("./../services/services");


exports.teste  = (req, res) =>{
    metodosBD.testePromise()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
}

exports.insNewUser = (req,res) =>{
    metodosBD.inserirUser(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
}

exports.mostrarUsers = (req,res) =>{
    metodosBD.mostrarUsers()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
}

exports.apagarTudo = (req, res) =>{
    metodosBD.apagartudo()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
}

