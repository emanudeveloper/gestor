const {Router} = require('express');
const route = Router();
const controladorPrincipal = require('../controladores/principalControlador');

route.get('/archivos', controladorPrincipal.mostrarVista);

module.exports = route;