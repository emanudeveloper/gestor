const mongoose = require("mongoose");
const esquema = mongoose.Schema({ 
    pdf:String,
    f_recepcion: Date, 
    titulo: String, 
    f_doc: Date, 
    hojas:Number,     
    autor:String, 
    descripcion: String, 
    f_remision:Date, 
    oficina:String,     
    url:String         
    },{ timestamps: true });
    // estado:String, 
    //modificacion:Date    
    var documentoModel = mongoose.model('Documento', esquema);
module.exports = documentoModel;

// const esquema = mongoose.Schema({ f_recepcion: new Date("28/03/2022"), titulo: "OFICIO Nº 060-2022-CS LA JOYA", f_doc: new Date("21/03/2022"), hojas:17, descripcion:"Solicito pago de prestación económico de sepelio", autor:"Zenaida Huaman", f_remision:new Date("29/03/2022"), destino:"Desp", url:"logistica", estado:"finalizado", modificacion:new Date(Date.now())});