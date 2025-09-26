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

select * from paises;

select * from cidades;