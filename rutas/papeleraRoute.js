const {Router} = require('express');
const route = Router();
const papeleraController = require('../controladores/papeleraController');

route.get('/papelera', papeleraController.mostrarVista);

module.exports = route;