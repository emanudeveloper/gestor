const mongoose = require("mongoose");
// const conexion = require('../conexiondb.js');
const esquema = mongoose.Schema({ 
    f_recepcion: Date, 
    titulo: String, 
    f_doc: Date, 
    hojas:Number, 
    descripcion: String, 
    autor:String, 
    f_remision:Date, 
    destino:String, 
    url:String, 
    estado:String, 
    modificacion:Date});
const documentoModel = mongoose.model('Documento', esquema);

module.exports = documentoModel;

// const esquema = mongoose.Schema({ f_recepcion: new Date("28/03/2022"), titulo: "OFICIO Nº 060-2022-CS LA JOYA", f_doc: new Date("21/03/2022"), hojas:17, descripcion:"Solicito pago de prestación económico de sepelio", autor:"Zenaida Huaman", f_remision:new Date("29/03/2022"), destino:"Desp", url:"logistica", estado:"finalizado", modificacion:new Date(Date.now())});