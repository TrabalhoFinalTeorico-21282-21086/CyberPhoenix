insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','1','
	Delimiter $$
	drop function if exists ex1 $$
	create function ex1(frase varchar(250))
	returns varchar(20)
	deterministic
	begin
		declare l char(1);
		declare i,d,o int default 1;
		 declare continue handler for sqlstate "23000" set d=1; 
		 set d = 0;
		 
		 set frase = trim(frase);
		create temporary table ft(
			letra char(1),
			  nOcorrencia int,
			primary key(letra)
		);
		 
		 while(i < length(frase) + 1) do
			if(d = 0)then
				insert into ft(letra,nOcorrencia)values(substring(frase,i,1), 1);
			end if;
			if(d = 1)then
				update ft set ft.nOcorrencia = ft.nOcorrencia + 1 where ft.letra like substring(frase,i,1);
				set d = 0;
			end if;
			set i = i + 1;
		 end while;
		 
		 set l = (select letra
				 from ft
				  order by nOcorrencia desc
				 limit 1);
		
		 set o = (select nOcorrencia
				 from ft
					order by nOcorrencia desc
				 limit 1);

		 drop temporary table ft;
		return concat(l, ", ", o, " occorências");
	end $$
	Delimiter ;
');

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','2','
	Delimiter $$
	drop function if exists ex2 $$
	create function ex2(num int)
	returns varchar(250)
	deterministic
	begin
		declare b int  default 1;
		 declare result varchar(250) default "";
		 
		 while(b <= num) do
			set b = b * 2;
		 end while;
		 
		 set b = b / 2;
		 
		 while(b > 0) do
			if(num >= b)then 
				set num = num - b;
					set result = concat(result, "1");
			else set result = concat(result, "0");
			end if;
			  if(b > 1)then set b = b / 2;
			  elseif (b <= 1)then set b = b - 1;
			  end if;
		 end while;

		 return result;
	end $$
	Delimiter ;
');

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','3',"
	Delimiter $$

	drop procedure if exists ex3;$$

	create procedure ex3()
	begin
		declare a,e varchar(255);
		 declare b,f int default 0;
		 declare c,d decimal(10,4);
		declare cur cursor for 
		select artista.nome, cAlbuns.nm, mfaixas.mfaixas, mAlbuns.malbuns, titulo.tl
		from artista,

		(select artista.artista_id as art, count(album.album_id) as nm
		from artista, album
		where artista.artista_id = album.artista
		group by art)cAlbuns,

		(select album.artista as art, avg(faixas.duracao) as mfaixas
		from album, faixas
		where album.album_id = faixas.album
		group by album.artista)mfaixas,

		(select album.artista as art, alb.dalb/count(album.album_id) as malbuns
		from album, 
		(select album.artista as art, sum(faixas.duracao) as dalb
		from album, faixas
		where album.album_id = faixas.album
		group by album.artista)alb
		where album.artista = alb.art
		group by album.artista)mAlbuns,

		(select art.art as art, alb.tl as tl
		from
		(select album.artista as art, max(tbl.tmp) as tmp
		from album,
			(select album.album_id as alb, sum(faixas.duracao) as tmp
			from album, faixas
			where album.album_id = faixas.album
			group by alb)tbl
		where album.album_id = tbl.alb
		group by album.artista)art,
		(select album.artista as art, album.titulo as tl, sum(faixas.duracao) as tmp
		from album, faixas
		where album.album_id = faixas.album
		group by album.album_id)alb
		where art.art = alb.art && art.tmp = alb.tmp)titulo

		where artista.artista_id = cAlbuns.art && artista.artista_id = mfaixas.art && artista.artista_id = mAlbuns.art && artista.artista_id = titulo.art;
		 
		 declare continue handler for sqlstate '02000' set f = 1;
		 declare continue handler for sqlstate '23000' set f = 1;
		
		create table if not exists ficha7ex3(
			artista varchar(255),
			numAlb int,
			durMediaFaixa decimal(10,4),
			durMediaAlbum decimal(10,4),
			albMaisLongo varchar(255),
			  primary key(artista)
		 )engine = innodb;
		 
		 delete from ficha7ex3;
		 
		open cur;
			lopy : loop
				if(f != 1)then
					fetch cur into a,b,c,d,e;
					insert into ficha7ex3(artista, numAlb, durMediaFaixa, durMediaAlbum, albMaisLongo) values(a,b,c,d,e);
				end if;
					if(f = 1)then 
					leave lopy;
				end if;
			end loop;
		 close cur;
	end $$

	Delimiter ;
");

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','4','
	Delimiter $$
	drop procedure if exists apagaConsultas $$
	create procedure apagaConsultas(in idCon int)
	begin
		declare d int default 0;
		declare continue  handler for 1451 set d = 1;
		
		 delete 
		 from tbl_Consultas
		 where idConsulta = idCon;
		 
		 if(d = 1)then
			create table if not exists tbl_error_log(
				id int auto_increment,
				codigoErro int,
				mensagem varchar(200),
				primary key(id)
		  )engine = innodb;
		  insert into tbl_error_log(codigoErro, mensagem)values(1451, concat("Em ", Now(), " não foi possivel eliminar a consulta numero ", idCon, " devido a violacão da entidade referencial"));
		 end if;
	end $$
	Delimiter ;
');

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','5','
	Delimiter $$
		drop procedure if exists db3.ex5 $$
		 create procedure db3.ex5()
		 begin
			
			  declare d, id, e int default 0;
			  declare preco, precoAux double;
			  declare nome, descricao varchar(50);
			  declare codBarras char(20);
			  declare tab1 cursor for select * from db1.Produtos;
			  declare tab2 cursor for select * from db2.Produts;
			  
			  declare continue handler for sqlstate "02000" set d = 1;
			  declare continue handler for sqlstate "23000" set d = 1;
			  declare continue handler for 1062 set e = 1;
		 
			create table if not exists db3.Produtos(
				idProduto int auto_increment,
					nome varchar(50) not null unique,
					descricao varchar(20),
					preco double,
					codigoBarras varchar(20),
					primary key(idProduto)
			  )engine = innodb;
		 
			delete 
			  from db3.Produtos;
				
			open tab1;
				lopy1: loop
					fetch tab1 into id, nome, descricao, preco, codBarras;
						 insert into db3.Produtos(nome, descricao, preco, codigoBarras)values(lower(trim(nome)), descricao, preco, codBarras);
						 if(d = 1)then
						leave lopy1;
					end if;
					end loop;
			  close tab1;
			  
			  set d = 0;
			  
			  open tab2;
				lopy2: loop
					fetch tab2 into id, nome, preco, descricao, codBarras;
					insert into db3.Produtos(nome, descricao, preco, codigoBarras)values(lower(trim(nome)), null, preco, codBarras);
						 if(e = 1)then
						set precoAux = (select db3.Produtos.preco
											 from db3.Produtos
											 where db3.Produtos.nome = nome);
						if(preco < precoAux)then
							update db3.Produtos
									set db3.Produtos.preco = preco, db3.Produtos.codigoBarras = codBarras
									where db3.Produtos.nome = nome;
						end if;
							  set e = 0;
						 end if;
						 if(d = 1)then
						leave lopy2;
					end if;
				end loop;
			  close tab2;
			  
		 end $$
	Delimiter ;
');

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','6a','
	Delimiter $$
	drop procedure if exists ex6a $$
	create procedure ex6a(in loginP varchar(25),in passP varchar(50), in nomeP varchar(50), in NIFP char(9), in telemovelP varchar(12))
	begin
		
		 declare i, bloc int default 1;
		 declare continue handler for 1062 set bloc = 1;
		 
		create table if not exists Autenticacao(
			ID int,
			  login varchar(25) not null,
			  pass varchar(50) not null,
			  dataAutenticacao date not null,
			  primary key(ID)
		 )engine = innodb;
		 
		 create table if not exists Utilizador(
			ID int,
			  nome varchar(50) not null,
			  email varchar(100) not null,
			  NIF char(9) not null,
			  telemovel varchar(12) not null,
			  primary key(ID),
			  foreign key(ID) references Autenticacao(ID)
		 )engine = innodb;
		 
		while (bloc = 1) do
			set bloc = 0;
			  insert into Autenticacao(ID, login, pass, dataAutenticacao)values(i, loginP, passP, now());
			  insert into Utilizador(ID, nome, email, NIF, telemovel)values(i, nomeP, concat(loginP, "@email.pt"), NIFP, telemovelP);
			set i = i + 1;
		 end while;
	end $$
	Delimiter ;
');

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','6b','
	create table if not exists backupUtilizadores(
		id int auto_increment,
		 idHistory int,
		 login varchar(50),
		 pass varchar(50),
		 dataAutenticacao date,
		 email varchar(100),
		 nome varchar(50),
		 NIF char(9),
		 telemovel varchar(12),
		 tabelaOrigem varchar(15),
		 tipoOperacao varchar(10),
		 primary key(id)
	)engine = innodb;
	
	Delimiter $$
	create trigger ex6AutenticacaoUpdate
	before update on Autenticacao
	for each row
	begin
		 declare b, c, d, e varchar(100);
		declare cur cursor for
		 select nome, email, NIF, telemovel
		 from Utilizador
		 where ID = new.ID;
		 
		 open cur;
			fetch cur into  b,c,d,e;
			insert into backupUtilizadores(idHistory, login, pass, dataAutenticacao, email, nome, NIF, telemovel, tabelaOrigem, tipoOperacao) values (old.ID, old.login, old.pass, old.dataAutenticacao, b, c, d, e, "Autenticacao", "Update");
		 close cur;
	end $$

	create trigger ex6AutenticacaoDelete
	before delete on Autenticacao
	for each row
	begin
		 declare b, c, d, e varchar(100);
		declare cur cursor for
		 select nome, email, NIF, telemovel
		 from Utilizador
		 where ID = old.ID;
		 
		 open cur;
			fetch cur into  b,c,d,e;
			insert into backupUtilizadores(idHistory, login, pass, dataAutenticacao, email, nome, NIF, telemovel, tabelaOrigem, tipoOperacao) values (old.ID, old.login, old.pass, old.dataAutenticacao, b, c, d, e, "Autenticacao", "Delete");
		 close cur;
		 
		 delete 
		 from Utilizador
		 where ID = old.ID;
	end $$

	create trigger ex6UtilizadorUpdate
	before update on Utilizador
	for each row
	begin
		declare a, b varchar(100);
		 declare c date;
		declare cur cursor for
		 select login, pass, dataAutenticacao
		 from Autenticacao
		 where ID = new.ID;
		 
		 open cur;
			fetch cur into  a, b, c;
			insert into backupUtilizadores(idHistory, login, pass, dataAutenticacao, email, nome, NIF, telemovel, tabelaOrigem, tipoOperacao) values (old.ID, a, b, c, old.nome, old.email, old.NIF, old.telemovel, "Utilizador", "Update");
		 close cur;
	end $$

	create trigger ex6UtilizadorDelete
	before delete on Utilizador
	for each row
	begin
		declare a, b varchar(100);
		 declare c date;
		declare cur cursor for
		 select login, pass, dataAutenticacao
		 from Autenticacao
		 where ID = old.ID;
		 
		 open cur;
			fetch cur into  a, b, c;
			insert into backupUtilizadores(idHistory, login, pass, dataAutenticacao, email, nome, NIF, telemovel, tabelaOrigem, tipoOperacao) values (old.ID, a, b, c, old.nome, old.email, old.NIF, old.telemovel, "Utilizador", "Delete");
		 close cur;
		 
		delete 
		 from Autenticacao
		 where ID = old.ID;
	end $$

	Delimiter ;
');

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','7a',"
	Prepare ex7a
	From '
	 select count(*)
	 from pessoa
	 where year(data_nasc) = ?';
	 
	 set @a = 2020;
	 execute ex7a using @a;
");

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','7b',"
	Prepare ex7b
	From '
	select year(data_nasc), count(*)
	from pessoa
	where year(data_nasc) >= ?  && ? <= year(now())
	group by data_nasc;';
	 
	 set @a = 1999;
	 execute ex7b using @a, @a;
");

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','7c','
	create event ex7c
	on schedule at current_timestamp + interval 1 day
	do 
	delete 
	from pessoa
	where datediff(now(), data_nasc) < 0;
');

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','7d','
	create event ex7d
	on schedule at current_timestamp + interval 1 month
	do 
	delete 
	from pessoa
	where year(now()) - 20 > year(data_nasc);
');

insert into 2020_bd2.ficha7 (aluno,idresposta,resposta)
values('lei21086','7e','
	Delimiter $$
	drop procedure if exists ex7e $$
	create procedure ex7e()
	begin
		declare morada, comando varchar(255);
		 declare d, maior int default 0;
		declare cur cursor for 
		 select pessoa.morada
		 from pessoa;
		 
		 declare continue handler for sqlstate "23000" set d = 1;
		declare continue handler for sqlstate "02000" set d = 1;
		 
		 open cur;
			lopy: loop
				if(d != 1) then
					fetch cur into morada;
					if(length(morada) > maior)then
						set maior = length(morada);
					end if;
				elseif(d = 1) then
					leave lopy;
					end if;
			end loop;
		close cur;
		 
		 set maior = maior + 5;
		 
		 set @a = concat("
		 alter table pessoa 
		 change morada morada varchar(",maior,")");
		 
		 prepare qry from @a;
		 execute qry;
		 
	end $$
	Delimiter ;
');