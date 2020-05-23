const bd = require("./../bd/sql");

exports.mostrarFicheiroDeUmUser = (id) => {
    return new Promise((resolve, reject) => {
        bd.all(`select idFicheiro, nome, descricao, tipoDeFicheiro from ficheiro where idUser = ?`, [id], (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        })
    });
}

exports.mostrarFicheirosCategorizados = (body) => {
    return new Promise((resolve, reject) => {
        bd.all(`select idFicheiro, nome, descricao, tipoDeFicheiro from ficheiro where tipoDeFicheiro = ?`, [body.tipo], (err, rows) => {
            if (err) reject({ err });
            else resolve(rows);
        });
    });
}

exports.mostrarFicheiros = () => {
    return new Promise((resolve, reject) => {
        bd.all(`select idFicheiro, nome, descricao, tipoDeFicheiro from ficheiro`, (err, rows) => {
            if (err) reject({ err });
            else resolve(rows);
        });
    });
}

exports.mostrarFicheiroUnico = (id) => {
    return new Promise((resolve, reject) => {
        bd.get(`select * from ficheiro where idFicheiro = ?`, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}


exports.apagarFicheiros = () => {
    return new Promise((resolve, reject) => {
        bd.run(`delete  from ficheiro;`, (err, rows) => {
            if (err) reject({ err });
            else resolve(rows);
        });
    });
}