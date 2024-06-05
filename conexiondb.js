const mongoose = require('mongoose'); //var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mesapartes"; 
// var url = "mongodb+srv://diresa-mesa:mA0fORQB59l5bgOk@mesadepartes.qqsmout.mongodb.net/mesapartes?retryWrites=true&w=majority";
var url = "mongodb+srv://diresa-mesa:iXJd2kSqzUE68dEv@clusteralmacen.eldbjzy.mongodb.net/?retryWrites=true&w=majority&appName=clusteralmacen&connectTimeoutMS=30000";
//iXJd2kSqzUE68dEv  ultima pasword
//diresa-mesa

//mA0fORQB59l5bgOk

module.exports = mongoose.connect(url, { //(url || process.env.MONGODB_URI)
  useNewUrlParser: true,
  useUnifiedTopology: true

}).then((ans)=>{  
  console.log(`Conectado`);

}).catch((err)=>{
  console.log(`Error de conexion: ${err}`);
});


