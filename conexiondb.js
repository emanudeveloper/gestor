const mongoose = require('mongoose'); //var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/mesapartes"; //var url = "mongodb://localhost:27017/";
// var url = "mongodb+srv://diresa-mesa:mA0fORQB59l5bgOk@mesadepartes.qqsmout.mongodb.net/?retryWrites=true&w=majority";
var url = "mongodb+srv://diresa-mesa:mA0fORQB59l5bgOk@mesadepartes.qqsmout.mongodb.net/mesapartes?retryWrites=true&w=majority";

//diresa-mesa
//mA0fORQB59l5bgOk
// mongoose.pluralize(null);

module.exports = mongoose.connect((process.env.MONGODB_URI || url), {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true
}).then((ans)=>{
  
  
  // , function(err, db){
  //   {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   }
  // }
  
  console.log(`Conectado`);

  // var doc = '{"_id":{"$oid":"63442f361986a0976e58fd12"},"f_recepcion":{"$date":{"$numberLong":"1665084330000"}},"titulo":"OFICIO Nº 060-2022-CS LA JOYA","hojas":{"$numberInt":"17"},"descripcion":"Solicito pago de prestación económico de sepelio","autor":"Zenaida Huaman","f_remision":{"$date":{"$numberLong":"1664968830000"}},"destino":"Desp","url":"","estado":"","modificacion":{"$date":{"$numberLong":"1664986949952"}}}';
  // db.db.collection("documentos").insertOne(doc, function(err, res) {
  //       if (err) throw err;
  //       console.log("1 document inserted");
  //       db.close();
  //     });
}).catch((err)=>{
  console.log(`Error de conexion: ${err}`);
});


// const conexion = MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mesapartes");
//   var myobj = { f_recepcion: new Date("28/03/2022"), titulo: "OFICIO Nº 060-2022-CS LA JOYA", f_doc: new Date("21/03/2022"), hojas:17, descripcion:"Solicito pago de prestación económico de sepelio", autor:"Zenaida Huaman", f_remision:new Date("29/03/2022"), destino:"Desp", url:"logistica", estado:"finalizado", modificacion:new Date(Date.now())};
//   dbo.collection("documento").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

// module.exports = conexion;