const {Router} = require('express');
const route = Router();
const papeleraController = require('../controladores/papeleraController');
const {verificarInicio} = require('../passport/verficarInicioDeSesion')

route.get('/papelera', verificarInicio, papeleraController.mostrarVista);

module.exports = route;