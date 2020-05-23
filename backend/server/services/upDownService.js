const bd = require("./../bd/sql");
const uuid = require("uuid").v4;

exports.inserirFicheiro = (idUser, body, file) => {
    const idFicheiro = uuid();
    const ficheiro = file.file;
    const nomeFicheiro = "f" + idUser + ficheiro.name;
    return new Promise((resolve, reject) => {
        bd.run(`insert into ficheiro(idFicheiro, idUser, nome, descricao, tipoDeFicheiro, localFicheiro) values(?,?,?,?,?,?);`, [idFicheiro, idUser, body.nome, body.descricao, body.tipo, nomeFicheiro], err => {
            if (err) reject({ message: "Nâo foi possivel carregar o ficheiro" });
            else {
                ficheiro.mv(__dirname + "/../files/" + nomeFicheiro, erro => {
                    if (erro) {
                        bd.run("delete from ficheiro where localFicheiro = ?", [nomeFicheiro]);
                        reject({ message: "Nâo foi possivel carregar o ficheiro" });
                    }
                    else resolve({ message: "Ficheiro carregado com sucesso" });
                });
            }
        }
        );
    });
}