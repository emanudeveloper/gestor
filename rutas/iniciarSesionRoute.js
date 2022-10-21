const {Router} = require('express');
const router = Router();
const iniciarSessionController = require('../controladores/iniciarSesionController');

router.get('/iniciarSesion', iniciarSessionController.iniciar);

module.exports = router;