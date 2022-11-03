const mongoose = require('mongoose'); //var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mesapartes"; 
var url = "mongodb+srv://diresa-mesa:mA0fORQB59l5bgOk@mesadepartes.qqsmout.mongodb.net/mesapartes?retryWrites=true&w=majority";

//diresa-mesa
//mA0fORQB59l5bgOk

module.exports = mongoose.connect((url || process.env.MONGODB_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true

}).then((ans)=>{  
  console.log(`Conectado`);

}).catch((err)=>{
  console.log(`Error de conexion: ${err}`);
});


