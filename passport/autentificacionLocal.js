const passport = require('passport');
const estrategiaLocal = require('passport-local').Strategy;
const usuarioModel = require('../modelos/usuario')


passport.serializeUser((usuario, done)=>{
    done(null, usuario.usuario)} //usuario.id   
);

passport.deserializeUser(async (usuario, done)=>{
    const Usuario = await usuarioModel.findById(id);
    done(null, Usuario);
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
            return done(null, false, null); //req.flash('mError','El usuario ya existe')
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
        const compararClave = unUsuario.compararClave(clave);
        // console.log("Usuario encontrado: \n",unUsuario);
        // console.log("conincide clave: \n", compararClave);

        if(!unUsuario){

            return done(null, false, (req, res)=>{
                res.send("El usuario no ha sido encontrado");
            })//req.flash('mError','El usuario no ha sido encontrado')            
            
        }else if(!compararClave){       
            return done(null, false, null);//req.flash('mError','La clave es incorrecta')
           
        }else{
            console.log("Usuario logueado: \n", unUsuario);
            done(null, unUsuario);
        }
    }catch (e){
        console.error("Error al iniciar Sesion: ", e);
        return done(null, false);
        
    }    
}));
