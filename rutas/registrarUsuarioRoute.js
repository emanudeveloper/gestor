const {Router} = require('express');
const router = Router();
const registrarUsuarioController = require('../controladores/registrarUsuarioController');
const passport = require('passport');

router.get('/registrarUsuario', registrarUsuarioController.mostrar);

router.post('/registrarUsuario', passport.authenticate('registroUsuarioLocal', {
    successRedirect:'/iniciarSesion',
    failureRedirect:'/registrarUsuario',
    passReqToCallback:true
}));

module.exports = router;