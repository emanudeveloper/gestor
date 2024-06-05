const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const esquemaUsuario = new Schema({
    nombres: String,
    apellidos: String,
    dni: String, 
    correo:String,   
    usuario: String,
    clave:String
});

esquemaUsuario.methods.encriptarClave = (clave)=>{
    return bcrypt.hashSync(clave, bcrypt.genSaltSync(10));
}

esquemaUsuario.methods.compararClave = function(clave){

    return bcrypt.compareSync(clave, this.clave);
}

const modeloUsuario = mongoose.model('Usuario',esquemaUsuario);

module.exports = modeloUsuario;