const mongoose = require("mongoose");
// const conexion = require('../conexiondb.js');
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
    });
    // estado:String, 
    //modificacion:Date
    
    var documentoModel = mongoose.model('Documento', esquema);

    // async function insertar(){
    //     documentoModel = await mongoose.model('Documento', esquema);
        
    //     var modelo = new documentoModel({});
        //modelo.save(function(err, data) {
            // if(err) {
            //     console.log(error);
            // }
            // else {
            //     res.send("Data inserted");
            // }
        //});
        // await documentoModel.insertMany([{
        //     "f_recepcion":{"$date":{"$numberLong":"1664968830000"}},
        //     "titulo":"OFICIO Nº 060-2022-CS LA JOYA",
        //     "hojas":17, 
        //     "descripcion":"Solicito pago de prestación económico de sepelio",
        //     "autor":"Zenaida Huaman","f_remision":{"$date":{"$numberLong":"1664968830000"}},
        //     "destino":"Desp",
        //     "url":"",
        //     "estado":"",
        //     "modificacion":{"$date":{"$numberLong":"1664986949952"}}}]);    }

    // insertar();


module.exports = documentoModel;

// const esquema = mongoose.Schema({ f_recepcion: new Date("28/03/2022"), titulo: "OFICIO Nº 060-2022-CS LA JOYA", f_doc: new Date("21/03/2022"), hojas:17, descripcion:"Solicito pago de prestación económico de sepelio", autor:"Zenaida Huaman", f_remision:new Date("29/03/2022"), destino:"Desp", url:"logistica", estado:"finalizado", modificacion:new Date(Date.now())});