const passport = require('passport');
const estrategiaLocal = require('passport-local').Strategy;
const usuarioModel = require('../modelos/usuario')


passport.serializeUser((usuario, done)=>{
    done(null, usuario.id)} //usuario.id   
);

passport.deserializeUser(async (id, done)=>{
    const usuario = await usuarioModel.findById(id);
    done(null, usuario);
})

passport.use('registroUsuarioLocal', new estrategiaLocal({
    usernameField:'usuario',
    passwordField:'clave',
    passReqToCallback:true
}, async(req, usuario, clave, done)=>{

    try{
        const unUsuario = await usuarioModel.findOne({usuario:usuario});//usuario:usuario
        // console.log("Usuario encontrado: \n",unUsuario);
        if(unUsuario){
            return done(null, false, req.flash('errorDeRegistro','El usuario ya existe')); //req.flash('mError','El usuario ya existe')
        }else{
            const nuevoUsuario = new usuarioModel();
            nuevoUsuario.usuario = usuario;
            nuevoUsuario.clave = nuevoUsuario.encriptarClave(clave);
            await nuevoUsuario.save();
            // console.log("Nuevo Usuario registrado: \n",nuevoUsuario);
        
            done(null, nuevoUsuario);
        }        
        
    }catch(e){
        console.error("Error: ", e)
        return done(null, false);
    }   
    
}));

passport.use('inicioSesionLocal', new estrategiaLocal({
    usernameField:'usuario',
    passwordField:'clave',
    passReqToCallback:true
}, async(req, usuario, clave, done)=>{
    try{
        const unUsuario = await usuarioModel.findOne({usuario:usuario});//usuario:usuario
        console.log("Usuario encontrado: \n",unUsuario);
        // const compararClave = unUsuario.compararClave(clave);        
        // console.log("conincide clave: \n", compararClave);

        if(!unUsuario){

            return done(null, false, req.flash('errorDeInicio','El usuario no está registrado')            )//req.flash('mError','El usuario no ha sido encontrado')            
            
        }else{
            const compararClave = unUsuario.compararClave(clave);        
            if(!compararClave){       // compararClave
                return done(null, false, req.flash('errorDeInicio','La clave es incorrecta'));//req.flash('mError','La clave es incorrecta')               
            }else{
                console.log("Usuario logueado: \n", unUsuario);
                 done(null, unUsuario);
            }   
            
        }
    }catch (e){
        console.error("Error al iniciar Sesion: ", e);
        return done(null, false);
        
    }    
}));
