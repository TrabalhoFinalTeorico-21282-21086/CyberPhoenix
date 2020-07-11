const bd = require("../bd/sql");
const uuid = require("uuid").v4;
const cifra = require("./../helpers/cifra");

exports.inserirSubscricao = (body) => {
    return new Promise((resolve, reject) => {
        bd.run(`insert into subscriccao(quemSubcreveu, quemFoiSubscrito) values(?,?)`, [body.quemSubcreveu, body.quemFoiSubscrito], (err) => {
            if (err) reject("unsuccess");
            else resolve("success");
        });
    });
}

exports.apagarSubscricao = (body) => {
    return new Promise((resolve, reject) => {
        bd.run(`delete from subscriccao where quemSubcreveu = ? and quemFoiSubscrito = ?`, [body.quemSubcreveu, body.quemFoiSubscrito], (err) => {
            if (err) reject("unsuccess");
            else resolve("success");
        });
    });
}

exports.existeSubscricao = (body) => {
    return new Promise((resolve, reject) => {
        bd.all(`select * from subscriccao where quemSubcreveu = ? and quemFoiSubscrito = ?`, [body.quemSubcreveu, body.quemFoiSubscrito], (err, rows) => {
            if (err) reject(err.message);
            else if (rows.length != 0) resolve(true);
            else resolve(false);
        });
    });
}

exports.mostrarQuemSubscreveu = (id) => {
    return new Promise((resolve, reject) => {
        bd.all(`select users.idUser, users.username, users.descricao from subscriccao, users where users.idUser = subscriccao.quemSubcreveu and subscriccao.quemFoiSubscrito = ?`, [id], (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

exports.mostrarQuemFoiSubscrito = (id) => {
    return new Promise((resolve, reject) => {
        bd.all(`select users.idUser, users.username, users.descricao from subscriccao, users where users.idUser = subscriccao.quemFoiSubscrito and quemSubcreveu = ?`, [id], (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}



exports.mostrarSubscricoes = () => {
    return new Promise((resolve, reject) => {
        bd.all(`select * from subscriccao`, (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

exports.apagarTodas = () => {
    return new Promise((resolve, reject) => {
        bd.run(`delete from subscriccao`, (err) => {
            if (err) reject(err.message);
            else resolve("ja foi");
        });
    });
}