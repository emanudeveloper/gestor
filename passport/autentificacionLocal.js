const passport = require('passport');
const estrategiaLocal = require('passport-local').Strategy;
const usuarioModel = require('../modelos/usuario')

passport.use('estrategiaLocal', new estrategiaLocal({
    usernameField:'usuario',
    passwordField:'clave',
    passReqToCallback:true
}, async(req, usuario, clave, done)=>{
    const nuevoUsuario = new usuarioModel();
    nuevoUsuario.usuario = usuario;
    nuevoUsuario.clave = nuevoUsuario.encriptarClave(clave);
    await nuevoUsuario.save();
    done(null, nuevoUsuario);
}));


passport.serializeUser((usuario, done)=>{
        done(null, usuario.id)
    }    
);

passport.deserializeUser(async (id, done)=>{
    const Usuario = await usuarioModel.findById(id);
    done(null, Usuario);
})