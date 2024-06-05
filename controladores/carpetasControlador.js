const documentoModel = require('../modelos/documentoModel');

const fs = require('fs');
const path = require('path');

const principalControlador = {
}

principalControlador.mostrarVista = async function (req, res){

  var ruta = "documentos";
  const archivos =[];
  const carpetas = [];
  let splitter;
    
  
  console.log("query: documentos")

  const documentos = await documentoModel.find({url:{$regex:ruta}}, {url:1}).sort({f_recepcion:-1});  //path
  
  documentos.forEach((elemento, index) => {
      
      splitter = elemento.url.split(/\\|\//);    
      console.log("splits: ", splitter);
      // console.log("pdf: ", splitter[1].search(/pdf/ig));
      let cadena = `/${splitter[1]}/`;

      if(splitter[1].search(/pdf/ig)==-1 ){
        // console.log("indice: ", carpetas.find(elemento=>{ elemento == splitter[1]}));
        if(carpetas.indexOf(splitter[1])==-1){
            carpetas.push(splitter[1]);      
        }          

      }else{
        archivos.push(splitter[1]);          
      }
  });
  console.log("carpetas: ", carpetas);
  console.log("Archivos: ", archivos);    
  res.render('carpetas.pug', {archivos, carpetas});      
  
}

principalControlador.abrirCarpeta = async (req, res)=>{
  //  
  var rutaAbrir="";

  new Promise((resolve, reject)=>{    
    rutaAbrir= path.join(__dirname,"../", req.query.ruta);
    if(rutaAbrir == null || rutaAbrir=="" || rutaAbrir==undefined){    
      reject("error en la ruta: " + err);
    }else{
      resolve(rutaAbrir);
    }

  }).then(
      (rutaResuelta)=>{
        console.log("then1 ruta resuelta: ", rutaResuelta)
        return fs.readdirSync(rutaResuelta, { withFileTypes: true })})
    .then(archivos=>
        {
          archivos.forEach(archivo=>{
            console.log("archivos: ", archivo.name)
          })          

        });        
  
  var ruta = req.query.ruta;

  const documentos = await documentoModel.find({url:{$regex:ruta}}, {url:1}).sort({f_recepcion:-1});  

  res.send(documentos);
  
}

principalControlador.descargar = function(req, res){
  
  var ruta = req.query.ruta;
  // console.log("descargar archivo: ", ruta);
  // console.log(req.url);
  res.download(ruta);
  // res.send("descargando");
}

principalControlador.eliminarCarpeta = function(req, res){


}

module.exports = principalControlador;



























