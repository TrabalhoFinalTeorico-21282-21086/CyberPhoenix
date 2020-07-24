const bd = require("./../bd/sql");
const uuid = require("uuid").v4;
const fs = require("fs");


//insere de dados a entrada de um novo ficheiro e cria o ficheiro na pasta files
exports.inserirFicheiro = (idUser, body, file) => {
    const idFicheiro = uuid();
    const ficheiro = file.file;
    const nomeFicheiro = "f" + idUser + ficheiro.name;
    return new Promise((resolve, reject) => {
        bd.query(`insert into ficheiro(idFicheiro, idUser, nome, descricao, tipoDeFicheiro, localFicheiro) values(?,?,?,?,?,?);`, [idFicheiro, idUser, body.nome, body.descricao, body.tipo, nomeFicheiro], err => {
            if (err) reject({ message: "Nâo foi possivel carregar o ficheiro" });
            else {
                ficheiro.mv(__dirname + "/../files/" + nomeFicheiro, erro => {
                    if (erro) {
                        bd.query("delete from ficheiro where localFicheiro = ?", [nomeFicheiro]);
                        reject({ message: "Nâo foi possivel carregar o ficheiro" });
                    }
                    else resolve({ message: "Ficheiro carregado com sucesso" });
                });
            }
        }
        );
    });
}

exports.modificarFicheiro = (body) => {
    return new Promise((resolve, reject) => {
        bd.query(`update ficheiro set nome = ?, descricao = ? where idFicheiro = ?`, [body.nome, body.descricao, body.idFicheiro], (err) => {
            if (err) reject(err.message);
            else resolve("success");
        })
    })
}

//em primeiro apaga todos os comentarios relacionados ao ficheiro e depois sim apaga o a entrada na base de dados do ficheiro
exports.apagarFicheiro = (body) => {
    return new Promise((resolve, reject) => {
        bd.query(`delete from feedback where ficheiro like ?`, [body.idFicheiro], (err) => {
            if (err) reject(err);
            else {
                bd.query(`delete from ficheiro where idFicheiro = ?`, [body.idFicheiro], (err) => {
                    if (err) reject(err);
                    else {
                        fs.unlink(__dirname + "/../files/" + body.localFicheiro, (err) => {
                            if (err) reject(err);
                            else resolve("success");
                        });
                        resolve("success");
                    }
                });
            }
        })
    });
}