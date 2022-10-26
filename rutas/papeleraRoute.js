const {Router} = require('express');
const route = Router();
const papeleraController = require('../controladores/papeleraController');
const {verificarInicio} = require('../passport/verficarInicioDeSesion')

<<<<<<< HEAD
    

    
route.get('/papelera', papeleraController.mostrarVista);
=======
route.get('/papelera', verificarInicio, papeleraController.mostrarVista);
>>>>>>> a5ea1b4bfd9abcadf04d67d4b64392786f541df4



module.exports = route;