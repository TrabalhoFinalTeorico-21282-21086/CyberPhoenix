const bd  = require("./../bd/sql");
const uuid = require("uuid").v4;

exports.testePromise = () =>{
    return new Promise((resolve, reject) =>{
        resolve("es estas ler isto esta tudo bem");
    });
}


exports.inserirUser = (body) =>{
    const id = uuid();
    return new Promise((resolve,reject) =>{
        bd.run(`insert into users(idUser, nome, apelido, username, pass, descricao) values(?, ?, ?, ?, ?, ?);`,[id, body.nome, body.apelido, body.username, body.pass, body.descricao],err =>{
            if(err)reject(err.message)
            else resolve({_id : id});
        });
    });
}

exports.mostrarUsers = () =>{
    return new Promise((resolve, reject) =>{
        bd.all(`select * from users;`, (err,rows) =>{
            if(err)reject(err.message);
            else resolve(rows);
        });
    });
}

exports.apagartudo = () =>{
    return new Promise((resolve, reject) =>{
        bd.run(`delete from users;`, (err) =>{
            if(err)reject(err.message);
            else resolve({message: "everything was erase"});
        })
    })


}

    