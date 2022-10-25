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

router.get('/cerrarSesion', (req, res, next)=>{
    req.logout(
        function(err){
            if(err){return next();}            
            res.redirect("/iniciarSesion");
        }        
    );
});


module.exports = router;