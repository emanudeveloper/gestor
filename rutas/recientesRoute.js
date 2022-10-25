const {Router} = require('express');
const router = Router();
const recientesController = require("../controladores/recientesController");
const {verificarInicio} = require('../passport/verficarInicioDeSesion')

// router.use((req, res, next)=>{
//     verificarInicio(req, res, next);
//     next();
// });

router.get('/', verificarInicio, recientesController.mostrarVista);
router.get('/buscar', verificarInicio, recientesController.buscarDocumentos);
// router.get('/:palabra', recientesController.buscarDocumentos);

// function verificarInicio(req, res, next){

//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect('/iniciarSesion');    
// }



module.exports = router;