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

exports.mostrarQuemSubscreveu = (body) => {
    return new Promise((resolve, reject) => {
        bd.all(`select quemSubscreveu from subscriccao where quemFoiSubscrito = ?`, [body.quemFoiSubscrito], (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

exports.mostrarQuemFoiSubscrito = (body) => {
    return new Promise((resolve, reject) => {
        bd.all(`select quemFoiSubscrito from subscriccao where quemSubscreveu = ?`, [body.quemSubcreveu], (err, rows) => {
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