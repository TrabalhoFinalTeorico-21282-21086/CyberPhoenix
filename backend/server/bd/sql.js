const sqlite3 = require("sqlite3");
const path = require("path");

//reconhece o ficheiro existente da base de dados, se não existir cria um proprio e cria o objecto bd(base de dados)
const bd = new sqlite3.Database(path.join(__dirname, "/database.db"), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) console.error(err.message);
        else console.log("Connected to the sqlite database");
    }
);

//criação das tabelas necessárias para a execução do backend do website
bd.run(
    `create table if not exists users(
        idUser varchar(250),
        username varchar(250) not null unique,
        pass varchar(250) not null,
        descricao text(1000),
        email varchar(250),
        role int,
        dataiv varchar(250),
        primary key(idUser)
    );`
);

bd.run(
    `create table if not exists ficheiro(
        idFicheiro varchar(250),
        idUser varchar(250) not null,
        nome varchar(250),
        descricao text(1000),
        tipoDeFicheiro varchar(20),
        localFicheiro varchar(255),
        primary key(idFicheiro),
        foreign key (idUser) references users(idUser)
    );`
);

bd.run(
    `create table if not exists subscriccao(
        quemSubcreveu varchar(250),
        quemFoiSubscrito varchar(250),
        primary key(quemFoiSubscrito, quemSubcreveu),
        foreign key(quemFoiSubscrito) references users(idUser),
        foreign key(quemSubcreveu) references users(idUser)
    );`
);

bd.run(
    `   create table if not exists feedback(
        idFB varchar(250) ,
        idUser varchar(250) not null,
        ficheiro varchar(250) not null,
        comentario text(1000),
        primary key(idFB),
        foreign key(idUser) references users(idUser),
        foreign key(ficheiro) references ficheiro(idFicheiro)
    );`
);

module.exports = bd;