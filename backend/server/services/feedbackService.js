const bd = require("../bd/sql");
const uuid = require("uuid").v4;


exports.mostrarFeedBack = () => {
    return new Promise((resolve, reject) => {
        bd.query(`select * from feedback;`, (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

exports.mostrarFeedBackFicheiro = (idFich) => {
    return new Promise((resolve, reject) => {
        bd.query(`select feedback.comentario, users.username from feedback, users where feedback.idUser = users.idUser and feedback.ficheiro = ?;`, [idFich], (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

exports.inserirFeedBack = (body) => {
    const id = uuid();
    return new Promise((resolve, reject) => {
        bd.query(`insert into feedback(idFB, idUser, ficheiro, comentario) values(?,?,?,?)`, [id, body.idUser, body.ficheiro, body.comentario], (err) => {
            if (err) reject(err);
            else resolve("success");
        })
    });
}

exports

exports.apagarFeedBack = () => {
    return new Promise((resolve, reject) => {
        bd.query(`delete from feedback;`, (err) => {
            if (err) reject(err.message);
            else resolve("já foi");
        });
    });
}