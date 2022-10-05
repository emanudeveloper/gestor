const {Router} = require('express');
const route = Router();
const recientesController = require("../controladores/recientesController")
route.get('/', recientesController.mostrarVista);

module.exports = route;