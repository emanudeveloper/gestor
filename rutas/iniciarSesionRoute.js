const {Router} = require('express');
const router = Router();
const iniciarSessionController = require('../controladores/iniciarSesionController');
const passport = require('passport');

router.get('/iniciarSesion', iniciarSessionController.iniciar);

router.post('/iniciarSesion', passport.authenticate('inicioSesionLocal', {
    successRedirect:'/',
    failureRedirect:'/iniciarSesion',
    passReqToCallback:true
}));

module.exports = router;