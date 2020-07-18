const metodosBD = require("./../services/fileService");

//chama ao serviço que mostra os dados de um ficheiro
exports.mostrarFicheiroDeUmUser = (req, res) => {
    metodosBD.mostrarFicheiroDeUmUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama ao serviço que mostra os ficheiros em função da categoria
exports.mostrarFicheirosCategorizados = (req, res) => {
    metodosBD.mostrarFicheirosCategorizados(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que mostra todos os ficheiros
exports.mostrarFicheiros = (req, res) => {
    metodosBD.mostrarFicheiros()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que mostra o ficheiro em que corresponde ao id passado por parametro
exports.mostrarFicheiro = (req, res) => {
    metodosBD.mostrarFicheiroUnico(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que apaga todos os ficheiros da bd
exports.apagarFicheiros = (req, res) => {
    metodosBD.apagarFicheiros()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}