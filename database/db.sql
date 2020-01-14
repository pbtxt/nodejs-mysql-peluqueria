CREATE DATABASE database_peluqueria;
use database_peluqueria;

CREATE TABLE usuarios (
    id_usuario INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    nombre_completo VARCHAR (100) NOT NULL
); 

ALTER TABLE usuarios 
    ADD PRIMARY KEY (id_usuario);

ALTER TABLE usuarios
    MODIFY id_usuario INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE reservas (
    id_reserva INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT(11) NOT NULL,
    id_tratamiento INT(11) NOT NULL,
    fecha_reservada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_reserva DATETIME NOT NULL,
    hora_fin TIMESTAMP NOT NULL,
    fecha_cancelacion DATETIME,
    costo_reserva FLOAT NOT NULL DEFAULT 30.0,
    cancelado ENUM('SI','NO') NOT NULL
);

CREATE TABLE tratamientos (
    id_tratamiento INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre_tratamiento VARCHAR(60) NOT NULL,
    duracion_tratamiento INT(3) NOT NULL,
    costo_tratamiento FLOAT NOT NULL
);

CREATE TABLE estilistas (
    id_estilista INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre_estilista VARCHAR(60) NOT NULL, 
    correo_estilista VARCHAR(100) NOT NULL
);

CREATE TABLE agenda (
    id_agenda INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_reserva INT(11) NOT NULL,
    id_estilista INT(11) NOT NULL,
    fecha_reservada DATETIME NOT NULL,
    hora_reservada TIME
);