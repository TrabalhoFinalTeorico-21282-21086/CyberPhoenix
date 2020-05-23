const bd = require("./../bd/sql");
const uuid = require("uuid").v4;
const cifra = require("./../helpers/cifra");

exports.registar = (body) => {
    const id = uuid();
    return new Promise((resolve, reject) => {
        const dataiv = cifra.generateIv();
        const password = cifra.encrypt(body.pass, dataiv);
        const email = cifra.encrypt(body.email, dataiv);
        bd.run(`insert into users(idUser, username, pass, descricao, email, role, dataiv) values(?, ?, ?, ?, ?, ?, ?);`, [id, body.username, password, body.descricao, email, 1, dataiv], err => {
            if (err) reject({ message: "unsuccess" })
            else resolve({ message: "success", role: 1, _id: id });
        });
    });
}

exports.autenticar = (body) => {
    return new Promise((resolve, reject) => {
        bd.all(`select idUser, username, pass, dataiv, role from users`, (err, rows) => {
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

exports.mostrarUsers = () => {
    return new Promise((resolve, reject) => {
        bd.all(`select idUser, username, descricao from users;`, (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

exports.mostrarUserUnico = (id) => {
    return new Promise((resolve, reject) => {
        bd.get(`select username, descricao from users where idUser = ?;`, [id], (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

exports.apagartudo = () => {
    return new Promise((resolve, reject) => {
        bd.run(`delete from users;`, (err) => {
            if (err) reject(err.message);
            else resolve({ message: "everything was erase" });
        });
    });
}