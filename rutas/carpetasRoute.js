const {Router} = require('express');
const route = Router();
const controladorPrincipal = require('../controladores/carpetasControlador');
const {verificarInicio} = require('../passport/verficarInicioDeSesion')

route.get('/carpetas', verificarInicio, controladorPrincipal.mostrarVista);//archivos
route.get('/carpetas/:nuevaRuta', verificarInicio, controladorPrincipal.abrirCarpeta);// /archivos
route.post('/carpetas/descargar', verificarInicio, controladorPrincipal.descargar);



module.exports = route;