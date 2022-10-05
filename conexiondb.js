var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const conexion = MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mesapartes");
  var myobj = { f_recepcion: new Date("28/03/2022"), titulo: "OFICIO Nº 060-2022-CS LA JOYA", f_doc: new Date("21/03/2022"), hojas:17, descripcion:"Solicito pago de prestación económico de sepelio", autor:"Zenaida Huaman", f_remision:new Date("29/03/2022"), destino:"Desp", url:"logistica", estado:"finalizado", modificacion:new Date(Date.now())};
  dbo.collection("documento").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

module.exports = conexion;