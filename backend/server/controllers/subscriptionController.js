const metodosBD = require("./../services/subscriptionService");
const jwt = require("./../helpers/jwt");

//chama o serviço que cria uma nova subscrição
exports.inserirSubscricao = (req, res) => {
    metodosBD.inserirSubscricao(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
}
//chama o serviço que apaga uma nova subscrição
exports.apagarSubscricao = (req, res) => {
    metodosBD.apagarSubscricao(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
}
//chama o serviço que verifica se existe uma subscrição especifica
exports.existeSubscricao = (req, res) => {
    metodosBD.existeSubscricao(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
}
//chama o serviço que mostra todas as subscrições
exports.mostrarSubscricoes = (req, res) => {
    metodosBD.mostrarSubscricoes()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que mostra quem subscreveu o utilizador especifico
exports.mostrarQuemSubscreveu = (req, res) => {
    metodosBD.mostrarQuemSubscreveu(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que mostra quem foi subscrito do utilizador especifico
exports.mostrarQuemFoiSubscrito = (req, res) => {
    metodosBD.mostrarQuemFoiSubscrito(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}
//chama o serviço que capaga todas as subscrições
exports.apagarTodas = (req, res) => {
    metodosBD.apagarTodas()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
}