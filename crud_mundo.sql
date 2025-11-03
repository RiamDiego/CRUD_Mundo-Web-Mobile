create database crud_mundo;
use crud_mundo;

create table paises (
	id_pais int primary key auto_increment not null,
    nome varchar(200) not null,
    continente varchar(25) not null,
    populacao int not null,
    idioma varchar(100) not null
);

create table cidades (
	id_cidades int primary key auto_increment not null,
    id_pais int not null,
	nome varchar(200) not null,
    população int not null,
    foreign key (id_pais) references paises(id_pais)
);

 create table usuarios(
 id int not null primary key auto_increment,
 email varchar(50) not null,
 usuario varchar(40) not null,
 senha varchar(128) not null 
 ) Engine = InnoDB;
 
 insert into usuarios_pedrosa (email, usuario, senha) values
("adm@gmail.com", "Admin1", sha1("1234"));

select * from paises;

select * from cidades;