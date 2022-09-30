const {Router} = require('express');
const route = Router();
const controladorPrincipal = require('../controladores/principalControlador');

route.get('/', controladorPrincipal.mostrarVista);

module.exports = route;