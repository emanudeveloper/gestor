const {Router} = require('express');
const route = Router();
const controladorPrincipal = require('../controladores/carpetasControlador');
const {verificarInicio} = require('../passport/verficarInicioDeSesion')

route.get('/carpetas', verificarInicio, controladorPrincipal.mostrarVista);// /archivos
route.post('/carpetas', verificarInicio, controladorPrincipal.cambiarCarpeta);// /archivos

module.exports = route;