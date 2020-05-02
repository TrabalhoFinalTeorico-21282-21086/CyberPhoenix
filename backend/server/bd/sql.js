const sqlite3 = require("sqlite3");
const path = require("path");

const bd = new sqlite3.Database(path.join(__dirname, "/database.db"), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) console.error(err.message);
        else console.log("Connected to the sqlite database");
    }
);

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
    );

    create table if not exists subscriccao(
        quemSubcreveu varchar(250),
        quemFoiSubscrito varchar(250),
        primary key(quemFoiSubscrito, quemSubcreveu),
        foreign key(quemFoiSubscrito) references users(idUser),
        foreign key(quemSubcreveu) references users(idUser)
    );
    
    create table if not exists enviada(
        idMens varchar(250),
        idUser int not null,
        primary key (idMens),
        foreign key(idUser) references users(idUser)
    );
    
    create table if not exists recebida(
        idMens varchar(250),
        idUser int not null,
        primary key (idMens),
        foreign key(idUser) references users(idUser)
    );
    
    create table if not exists mensagem(
        idMensagem varchar(250),
        texto text(2000) not null,
        dataEnviada date,
        vista enum("s", "n"),
        primary key(idMensagem)
    );

    create table if not exists ficheiro(
        idFicheiro varchar(250),
        idUser int not null,
        nome varchar(250),
        decricao text(1000),
        localFicheiro varchar(500),
        primary key(idFicheiro),
        foreign key (idUser) references users(idUser)
    )engine = innodb;
    
    create table if not exists feedback(
        idFB varchar(250),
        idUser int not null,
        ficheiro int not null,
        comentario text(1000),
        avaliacao int,
        primary key(idFB),
        foreign key(idUser) references users(idUser),
        foreign key(ficheiro) references ficheiro(idFicheiro)
    )engine = innodb;`
);


module.exports = bd;