const bd = require("./../bd/sql");
const uuid = require("uuid").v4;
const fs = require("fs");
const mC = require("../bd/minIO");


//insere de dados a entrada de um novo ficheiro e cria o ficheiro na pasta files
exports.inserirFicheiro = (idUser, body, file) => {
    const idFicheiro = uuid();
    const ficheiro = file.file;
    const nomeFicheiro = "f" + idUser + ficheiro.name;
    return new Promise((resolve, reject) => {
        bd.query(`insert into ficheiro(idFicheiro, idUser, nome, descricao, tipoDeFicheiro, localFicheiro) values(?,?,?,?,?,?);`, [idFicheiro, idUser, body.nome, body.descricao, body.tipo, nomeFicheiro], err => {
            if (err) reject({ message: "Nâo foi possivel carregar o ficheiro" });
            else {
                var fileName = __dirname + nomeFicheiro;
                ficheiro.mv(fileName, erro => {
                    if (erro) {
                        bd.query("delete from ficheiro where localFicheiro = ?", [nomeFicheiro]);
                        reject({ message: "Nâo foi possivel carregar o ficheiro" });
                    }
                    else {
                        // Using fPutObject API upload your file to the bucket europetrip.
                        mC.fPutObject(idUser, nomeFicheiro, fileName, (err, etag) => {
                            if (err) {
                                bd.query("delete from ficheiro where localFicheiro = ?", [nomeFicheiro]);
                                reject({ message: "Nâo foi possivel carregar o ficheiro" });
                            }
                            else {
                                fs.unlink(fileName, (err) => {
                                    if (err) {
                                        console.log("ola");
                                        bd.query("delete from ficheiro where localFicheiro = ?", [nomeFicheiro]);
                                        reject({ message: "Nâo foi possivel carregar o ficheiro" });
                                    }
                                    else resolve({ message: "Ficheiro carregado com sucesso" });
                                });
                            }
                        });
                    }
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
                        mC.removeObject(body.idUser, body.localFicheiro, (err) => {
                            if (err) reject(err);
                            else resolve("success");
                        });
                    }
                });
            }
        })
    });
}