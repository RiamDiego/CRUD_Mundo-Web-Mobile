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
    populacao int not null,
    foreign key (id_pais) references paises(id_pais)
);

create table usuarios(
 id int not null primary key auto_increment,
 email varchar(50) not null,
 usuario varchar(40) not null,
 senha varchar(128) not null 
 ) Engine = InnoDB;
 
 insert into usuarios (email, usuario, senha) values
("adm@gmail.com", "Admin1", sha1("1234"));

-- Continentes
INSERT INTO continentes (nome) VALUES
('Europa'),
('América do Sul'),
('América do Norte'),
('Ásia'),
('Oceania'),
('África');

-- Países
-- Europa
INSERT INTO paises (nome, id_cont, populacao, idioma) VALUES
('Itália', 1, 59000000, 'Italiano'),
('Grécia', 1, 10400000, 'Grego'),
('Noruega', 1, 5400000, 'Norueguês'),
('Belarus', 1, 9200000, 'Bielorrusso'),
('Romênia', 1, 19000000, 'Romeno'),
('Alemanha', 1, 84000000, 'Alemão');

-- América do Sul
INSERT INTO paises (nome, id_cont, populacao, idioma) VALUES
('Brasil', 2, 215000000, 'Português'),
('Peru', 2, 34000000, 'Espanhol'),
('Colômbia', 2, 52000000, 'Espanhol'),
('Chile', 2, 20000000, 'Espanhol'),
('Argentina', 2, 46000000, 'Espanhol');

-- América do Norte
INSERT INTO paises (nome, id_cont, populacao, idioma) VALUES
('México', 3, 130000000, 'Espanhol'),
('Canadá', 3, 40000000, 'Inglês'),
('Jamaica', 3, 3000000, 'Inglês'),
('Estados Unidos', 3, 335000000, 'Inglês'),
('Cuba', 3, 11300000, 'Espanhol');

-- Ásia
INSERT INTO paises (nome, id_cont, populacao, idioma) VALUES
('Butão', 4, 800000, 'Dzongkha'),
('Rússia', 4, 146000000, 'Russo'),
('China', 4, 1450000000, 'Chinês Mandarim'),
('Tailândia', 4, 70000000, 'Tailandês'),
('Arábia Saudita', 4, 36000000, 'Árabe');

-- Oceania
INSERT INTO paises (nome, id_cont, populacao, idioma) VALUES
('Austrália', 5, 27000000, 'Inglês'),
('Nova Zelândia', 5, 5200000, 'Inglês'),
('Fiji', 5, 900000, 'Inglês'),
('Papua Nova Guiné', 5, 9000000, 'Inglês'),
('Nauru', 5, 13000, 'Nauruano');

-- África
INSERT INTO paises (nome, id_cont, populacao, idioma) VALUES
('África do Sul', 6, 60000000, 'Inglês'),
('Angola', 6, 36000000, 'Português'),
('Egito', 6, 112000000, 'Árabe'),
('Etiópia', 6, 126000000, 'Amárico'),
('Marrocos', 6, 37000000, 'Árabe');

-- Cidades (cada bloco usa o id_pais seguindo a ordem de inserção acima)
-- Itália (id_pais = 1)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(1, 'Roma', 2873000),
(1, 'Milão', 1366000),
(1, 'Veneza', 261000),
(1, 'Florença', 382000),
(1, 'Nápoles', 962000);

-- Grécia (id_pais = 2)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(2, 'Atenas', 664000),
(2, 'Salônica', 315000),
(2, 'Patras', 214000),
(2, 'Heraclião', 140000),
(2, 'Larissa', 144000);

-- Noruega (id_pais = 3)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(3, 'Oslo', 693000),
(3, 'Bergen', 283000),
(3, 'Trondheim', 205000),
(3, 'Stavanger', 144000),
(3, 'Drammen', 101000);

-- Belarus (id_pais = 4)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(4, 'Minsk', 2000000),
(4, 'Gomel', 526000),
(4, 'Mogilev', 370000),
(4, 'Vitebsk', 365000),
(4, 'Hrodna', 360000);

-- Romênia (id_pais = 5)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(5, 'Bucareste', 1880000),
(5, 'Cluj-Napoca', 324000),
(5, 'Timișoara', 319000),
(5, 'Iași', 290000),
(5, 'Constanța', 283000);

-- Alemanha (id_pais = 6)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(6, 'Berlim', 3769000),
(6, 'Munique', 1472000),
(6, 'Hamburgo', 1841000),
(6, 'Colônia', 1086000),
(6, 'Frankfurt', 763000);

-- Brasil (id_pais = 7)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(7, 'São José dos Campos', 729000),
(7, 'Rio Branco', 419000),
(7, 'Brasília', 3050000),
(7, 'Salvador', 2880000),
(7, 'Curitiba', 1940000);

-- Peru (id_pais = 8)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(8, 'Lima', 9670000),
(8, 'Arequipa', 1000000),
(8, 'Trujillo', 970000),
(8, 'Cusco', 430000),
(8, 'Chiclayo', 600000);

-- Colômbia (id_pais = 9)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(9, 'Bogotá', 7740000),
(9, 'Medellín', 2560000),
(9, 'Cali', 2270000),
(9, 'Barranquilla', 1240000),
(9, 'Cartagena', 971000);

-- Chile (id_pais = 10)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(10, 'Santiago', 5740000),
(10, 'Valparaíso', 295000),
(10, 'Concepción', 223000),
(10, 'La Serena', 220000),
(10, 'Antofagasta', 361000);

-- Argentina (id_pais = 11)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(11, 'Buenos Aires', 3070000),
(11, 'Córdoba', 1390000),
(11, 'Rosário', 1320000),
(11, 'Mendoza', 1150000),
(11, 'La Plata', 789000);

-- México (id_pais = 12)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(12, 'Cidade do México', 9200000),
(12, 'Guadalajara', 1500000),
(12, 'Monterrey', 1130000),
(12, 'Puebla', 1430000),
(12, 'Tijuana', 1890000);

-- Canadá (id_pais = 13)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(13, 'Toronto', 2930000),
(13, 'Vancouver', 675000),
(13, 'Montreal', 1780000),
(13, 'Calgary', 1230000),
(13, 'Ottawa', 1070000);

-- Jamaica (id_pais = 14)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(14, 'Kingston', 670000),
(14, 'Montego Bay', 110000),
(14, 'Spanish Town', 160000),
(14, 'Portmore', 180000),
(14, 'Mandeville', 50000);

-- Estados Unidos (id_pais = 15)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(15, 'Nova Iorque', 8410000),
(15, 'Los Angeles', 3980000),
(15, 'Chicago', 2710000),
(15, 'Houston', 2320000),
(15, 'Filadélfia', 1580000);

-- Cuba (id_pais = 16)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(16, 'Havana', 2110000),
(16, 'Santiago de Cuba', 430000),
(16, 'Camagüey', 321000),
(16, 'Holguín', 292000),
(16, 'Guantánamo', 208000);

-- Butão (id_pais = 17)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(17, 'Thimphu', 114000),
(17, 'Phuntsholing', 27000),
(17, 'Paro', 25000),
(17, 'Punakha', 17000),
(17, 'Trongsa', 13000);

-- Rússia (id_pais = 18)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(18, 'Moscou', 12500000),
(18, 'São Petersburgo', 5350000),
(18, 'Novosibirsk', 1620000),
(18, 'Ecaterimburgo', 1490000),
(18, 'Nizhny Novgorod', 1250000);

-- China (id_pais = 19)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(19, 'Pequim', 21500000),
(19, 'Xangai', 24200000),
(19, 'Cantão', 15000000),
(19, 'Shenzhen', 13000000),
(19, 'Chengdu', 16300000);

-- Tailândia (id_pais = 20)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(20, 'Bangkok', 8280000),
(20, 'Chiang Mai', 127000),
(20, 'Phuket', 78000),
(20, 'Pattaya', 119000),
(20, 'Hat Yai', 159000);

-- Arábia Saudita (id_pais = 21)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(21, 'Riad', 7450000),
(21, 'Jidá', 3970000),
(21, 'Meca', 2050000),
(21, 'Medina', 1700000),
(21, 'Dammam', 1180000);

-- Austrália (id_pais = 22)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(22, 'Sydney', 5310000),
(22, 'Melbourne', 5070000),
(22, 'Brisbane', 2510000),
(22, 'Perth', 2050000),
(22, 'Adelaide', 1350000);

-- Nova Zelândia (id_pais = 23)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(23, 'Auckland', 1650000),
(23, 'Wellington', 212000),
(23, 'Christchurch', 383000),
(23, 'Hamilton', 176000),
(23, 'Tauranga', 158000);

-- Fiji (id_pais = 24)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(24, 'Suva', 88000),
(24, 'Nadi', 42000),
(24, 'Lautoka', 52000),
(24, 'Labasa', 27000),
(24, 'Ba', 15000);

-- Papua Nova Guiné (id_pais = 25)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(25, 'Port Moresby', 383000),
(25, 'Lae', 148000),
(25, 'Mount Hagen', 47300),
(25, 'Madang', 30000),
(25, 'Goroka', 21000);

-- Nauru (id_pais = 26)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(26, 'Yaren', 1100),
(26, 'Denigomodu', 1400),
(26, 'Anabar', 400),
(26, 'Boe', 700),
(26, 'Aiwo', 1400);

-- África do Sul (id_pais = 27)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(27, 'Cidade do Cabo', 4330000),
(27, 'Johanesburgo', 957000),
(27, 'Pretória', 741000),
(27, 'Durban', 595000),
(27, 'Port Elizabeth', 312000);

-- Angola (id_pais = 28)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(28, 'Luanda', 2800000),
(28, 'Huambo', 800000),
(28, 'Lubango', 700000),
(28, 'Benguela', 600000),
(28, 'Kuito', 450000);

-- Egito (id_pais = 29)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(29, 'Cairo', 10200000),
(29, 'Alexandria', 5200000),
(29, 'Giza', 8700000),
(29, 'Shubra El Kheima', 1100000),
(29, 'Port Said', 640000);

-- Etiópia (id_pais = 30)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(30, 'Adis Abeba', 3350000),
(30, 'Dire Dawa', 440000),
(30, 'Mekele', 330000),
(30, 'Gondar', 300000),
(30, 'Bahir Dar', 250000);

-- Marrocos (id_pais = 31)
INSERT INTO cidades (id_pais, nome, populacao) VALUES
(31, 'Casablanca', 3600000),
(31, 'Rabat', 580000),
(31, 'Marraquexe', 928000),
(31, 'Fez', 1110000),
(31, 'Agadir', 421000);

select * from paises;

select * from cidades;