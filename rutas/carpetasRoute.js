const {Router} = require('express');
const route = Router();
const controladorPrincipal = require('../controladores/carpetasControlador');

route.get('/carpetas', controladorPrincipal.mostrarVista);// /archivos


module.exports = route;