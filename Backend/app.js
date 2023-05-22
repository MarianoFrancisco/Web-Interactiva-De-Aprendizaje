/*
requerimos dotevn de nuestras variables, express, cors de seguridad, el path y app asignandole express y declaramos el puerto,
así mismo traemos nuestra configuracion de mongodb
*/
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { conexionBD } = require("./config/mongoDB");
const app = express();
const body_parser = require("body-parser");
const routes = require("./app/routes/index");
const morgan = require("morgan");
const credentials = require("./app/middleware/credentials");
const corsOptions = require("./config/corsOptions");
const http = require('http');
const socket = require('./server/server');

const PUERTO = process.env.PUERTO || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5010;
const server = http.createServer();
const io = socket.getIo(server);
app.use(morgan('dev'));
//Hacer uso de cors y permitir los json
app.use(express.json());
app.use(body_parser.json());
app.use(credentials);
app.use(cors(corsOptions));
//middleware for cookies
app.use(cookieParser());
app.use("/api/v1.0", routes);
//ubicacion de las imagenes
app.use("/public", express.static(path.join(`${__dirname}/uploads/img`)));
//Que nuestra aplicacion escuche por el puerto
conexionBD();
app.listen(PUERTO, () => {
  console.log("Puerto: ", PUERTO, " habilitado");
});
server.listen(SOCKET_PORT, () => {
  console.log("Puerto: ", SOCKET_PORT, " socket habilitado");
})
