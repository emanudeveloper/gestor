const {Router} = require('express');
const route = Router();
const controladorPrincipal = require('../controladores/carpetasControlador');
const {verificarInicio} = require('../passport/verficarInicioDeSesion')

route.get('/carpetas', verificarInicio, controladorPrincipal.mostrarVista);// /archivos

module.exports = route;