const bd = require("./../bd/sql");
const uuid = require("uuid").v4;
const cifra = require("./../helpers/cifra");
const fs = require("fs");

exports.registar = (body) => {
    const id = uuid();
    return new Promise((resolve, reject) => {
        const dataiv = cifra.generateIv();
        const password = cifra.encrypt(body.pass, dataiv);
        const email = cifra.encrypt(body.email, dataiv);
        bd.query(`insert into users(idUser, username, pass, descricao, email, role, dataiv) values(?, ?, ?, ?, ?, ?, ?);`, [id, body.username, password, body.descricao, email, 1, dataiv], err => {
            if (err) reject({ message: "unsuccess" })
            else resolve({ message: "success", role: 1, _id: id });
        });
    });
}

exports.modificar = (body) => {
    return new Promise((resolve, reject) => {
        const dataiv = cifra.generateIv();
        const pass = cifra.encrypt(body.pass, dataiv);
        const email = cifra.encrypt(body.email, dataiv);
        bd.query(`update users set username = ?, pass = ?, descricao = ?, email = ?, dataiv = ? where idUser = ?;`, [body.username, pass, body.descricao, email, dataiv, body.idUser], err => {
            if (err) reject(err);
            else resolve("success");
        });
    })
}

exports.modificarSuperior = (body) => {
    return new Promise((resolve, reject) => {
        const dataiv = cifra.generateIv();
        const password = cifra.encrypt(body.pass, dataiv);
        const email = cifra.encrypt(body.email, dataiv);
        bd.query(`update users set username = ?, pass = ?, descricao = ?, email = ?, role = ?, dataiv = ? where idUser = ?;`, [body.username, password, body.descricao, email, body.role, dataiv, body.idUser], err => {
            if (err) reject(err.message)
            else resolve({ message: "success", role: body.role, _id: id });
        });
    })
}

exports.autenticar = (body) => {
    return new Promise((resolve, reject) => {
        bd.query(`select idUser, username, pass, dataiv, role from users`, (err, rows) => {
            if (err) reject(err.message);
            else {
                rows.forEach(element => {
                    if (element.username == body.username && body.pass == cifra.decrypt(element.pass, element.dataiv)) resolve({ message: "success", role: element.role, _id: element.idUser });
                });
                resolve({ message: "unsuccess" });
            }
        });
    });
}

//apaga todos os ficheiros, subscrições, comentarios do utilizador que vai ser apagado
exports.apagarEspecifico = (id) => {
    return new Promise((resolve, reject) => {
        bd.query(`delete from subscriccao where quemSubcreveu = ? or quemFoiSubscrito = ?`, [id, id], (err) => {
            if (err) reject(err);
            else {
                bd.query(`delete from feedback where idUser = ?;`, [id], (err) => {
                    bd.query(`select * from ficheiro where idUser = ?;`, [id], (err, rows) => {
                        if (err) reject(err);
                        else {
                            rows.forEach(element => {
                                bd.query(`delete from feedback where ficheiro = ?;`, [element.idFicheiro], (err) => {
                                    if (err) reject(err);
                                    fs.unlink(__dirname + "/../files/" + element.localFicheiro, (err) => {
                                        if (err) reject(err);
                                    });
                                });
                            });
                        }
                        bd.query(`delete from ficheiro where idUser = ?;`, [id], (err) => {
                            if (err) reject(err);
                            else {
                                bd.query(`delete from users where idUser = ?;`, [id], (err) => {
                                    if (err) reject(err);
                                    else resolve({ message: "goodBye" });
                                });
                            }
                        });
                    });
                });
            }
        });

    });
}

exports.mostrarUsers = () => {
    return new Promise((resolve, reject) => {
        bd.query(`select idUser, username, descricao from users;`, (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

exports.mostrarUserUnico = (id) => {
    return new Promise((resolve, reject) => {
        bd.query(`select username, descricao from users where idUser = ?;`, [id], (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

exports.apagartudo = () => {
    return new Promise((resolve, reject) => {
        bd.query(`delete from users;`, (err) => {
            if (err) reject(err.message);
            else resolve({ message: "everything was erase" });
        });
    });
}