create database crud_mundo;
use crud_mundo;

create table continentes(
	id_cont int primary key auto_increment not null,
    nome varchar(100)
);

create table paises (
	id_pais int primary key auto_increment not null,
    nome varchar(200) not null,
    id_cont int not null,
    populacao int not null,
    idioma varchar(100) not null,
    foreign key (id_cont) references continentes(id_cont)
);

create table cidades (
	id_cidades int primary key auto_increment not null,
    id_pais int not null,
	nome varchar(200) not null,
    população int not null,
    foreign key (id_pais) references paises(id_pais)
);

-- Continentes
insert into continentes (nome) values
("Europa"),
("América do Sul"),
("América do Norte"),
("Ásia"),
("Oceania"),
("África");

-- Países
-- Europa
insert into paises (nome, id_cont, populacao, idioma) values
('Itália', 1, 59000000, 'Italiano'),
('Grécia', 1, 10400000, 'Grego'),
('Noruega', 1, 5400000, 'Norueguês'),
('Belarus', 1, 9200000, 'Bielorrusso'),
('Romênia', 1, 19000000, 'Romeno'),
('Alemanha', 1, 84000000, 'Alemão');

-- América do Sul
insert into paises (nome, id_cont, populacao, idioma) values
('Brasil', 2, 215000000, 'Português'),
('Peru', 2, 34000000, 'Espanhol'),
('Colômbia', 2, 52000000, 'Espanhol'),
('Chile', 2, 20000000, 'Espanhol'),
('Argentina', 2, 46000000, 'Espanhol');

-- América do Norte
insert into paises (nome, id_cont, populacao, idioma) values
('México', 3, 130000000, 'Espanhol'),
('Canadá', 3, 40000000, 'Inglês'),
('Jamaica', 3, 3000000, 'Inglês'),
('Estados Unidos', 3, 335000000, 'Inglês'),
('Cuba', 3, 11300000, 'Espanhol');

-- Ásia
insert into paises (nome, id_cont, populacao, idioma) values
('Butão', 4, 800000, 'Dzongkha'),
('Rússia', 4, 146000000, 'Russo'),
('China', 4, 1450000000, 'Chinês Mandarim'),
('Tailândia', 4, 70000000, 'Tailandês'),
('Arábia Saudita', 4, 36000000, 'Árabe');

-- Oceania
insert into paises (nome, id_cont, populacao, idioma) values
('Austrália', 5, 27000000, 'Inglês'),
('Nova Zelândia', 5, 5200000, 'Inglês'),
('Fiji', 5, 900000, 'Inglês'),
('Papua Nova Guiné', 5, 9000000, 'Inglês'),
('Nauru', 5, 13000, 'Nauruano');

-- África
insert into paises (nome, id_cont, populacao, idioma) values
('África do Sul', 6, 60000000, 'Inglês'),
('Angola', 6, 36000000, 'Português'),
('Egito', 6, 112000000, 'Árabe'),
('Etiópia', 6, 126000000, 'Amárico'),
('Marrocos', 6, 37000000, 'Árabe');


select * from paises;

select * from cidades;