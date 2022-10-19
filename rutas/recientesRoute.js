const {Router} = require('express');
const router = Router();
const recientesController = require("../controladores/recientesController")
router.get('/', recientesController.mostrarVista);
router.get('/buscar', recientesController.buscarDocumentos);
// router.get('/:palabra', recientesController.buscarDocumentos);

module.exports = router;