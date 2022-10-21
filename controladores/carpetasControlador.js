function llenarArbol(arbol, ruta, calback){

  let archivoCarpeta = fs.readdirSync(ruta, (err, files) => {
    // return files;
  });

  if(archivoCarpeta.length>0){
    // console.log("llamando al calback en la funcion 1 llenarArbol")
    calback(arbol, ruta, archivoCarpeta);
  }else{
    // console.log("no hay archivos ni carpetas"); 
  }

  // console.log(carpetas);
}

const cal = function (arb, recorrido, archCarps){

  archCarps.forEach(function (archCarp, index) {


    try {
        var nuevaCarpeta = {};
          let nuevaRuta= path.join(recorrido, archCarp);
          if ( fs.statSync(nuevaRuta).isDirectory()) {
              
              // console.log("ruta", nuevaRuta);
              // console.log("es directorio: ", archCarp);
              nuevaCarpeta[archCarp] = {};
              arb['carpetas']={...arb['carpetas'], ...nuevaCarpeta};
              llenarArbol(nuevaCarpeta, nuevaRuta);

          } else{
            // console.log("ruta", nuevaRuta);
            // console.log("es archivo: ", archCarp);
            arb['archivos'].push(archCarp);
          }
    }
    catch(err) {
        // console.log('it does not exist');
    }        
  })

  console.log(arb);
}

function crearArbol(ruta) { //async 
  
    fs.readdirSync(ruta, (err, files) => { //readdir() await 
      //, { withFileTypes: true } 
  
      // console.log(rutaArchivo);
        if (err){
          // console.log(err);
          return;
        }
        else {     
      
           files.forEach(function (file, index) {

              // if(file.includes('.pdf')){                
              //     files.splice(index,1);
              // } else {    //     // console.log(`FILE: ${file}`)
              //     console.log(`DIR: ${file}`);
              // }
              try {
                  var nuevaCarpeta = {};
                    let nuevaRuta= path.join(rutaArchivo, file);
                    if ( fs.statSync(nuevaRuta).isDirectory()) {
                        // console.log('Ruta', nuevaRuta);
                        // let llave = file;
                        // arbolCarpeta.carpeta={'tipo':"carpeta"};  

                        // console.log(true)
                        
                        nuevaCarpeta[file] = {};
                        arbolCarpeta['carpetas']={...arbolCarpeta['carpetas'], ...nuevaCarpeta};
                        //console.log("RutaCarpeta: ", nuevaRuta);
                        // console.log("Carpeta: ", file);
                        
                        return  crearArbol(nuevaRuta);
                         
    
                    } else{
                      
                      // console.log(`FILE: ${file}`)
                      // arbolCarpeta['archivos'] = [];

                      
                      arbolCarpeta['archivos'].push(file);
                      // console.log(false)
                      // console.log("RutaArchivo: ", nuevaRuta);
                      // console.log("Archivo: ", file);
                      
                      //   files.splice(index,1);
                    }
                    // arbolCarpeta.push(file); 
              }
              catch(err) {
                  // console.log('it does not exist');
              }
                           
          })

          return arbolCarpeta;
        }
        // console.log(arbolCarpeta);
        
      });
     
     
}

const fs = require('fs');
const path = require('path');
var rutaArchivo ="";//path.join(__dirname,"../","documentos")
const primeraVez = true;
// var arbolCarpeta={  
//   archivos:[]
// };

const principalControlador = {
}

const carpetas = ["Temporal", "Asesoría Jurídica", "Logística", "Servicios de Salud", 
"Administración", "Inteligencia Sanitaria", "Promoción de la Salud", "Control Institucional", 
"Estadística e Informática", "Laboratorio Referencial R."];

const enlaces =  ["/temporal", "/asesoria-juridica", "/logistica", "/servicios-salud", "/administracion", "/inteligencia-sanitaria", 
"/promocion-salud", "/control-institucional", "/estadistica-informatica", "/laboratorio-referencial-r"];


// let fs = require('fs');
// fs.readdir('../documentos/LOGISTICA/2022/octubre');

principalControlador.mostrarVista = function (req, res){
        
      res.render('carpetas.pug', {carpetas, enlaces});        
}

principalControlador.crearCarpeta = function(req, res){
  
}

principalControlador.eliminarCarpeta = function(req, res){

}

principalControlador.cambiarCarpeta = function(req, res){

}

module.exports = principalControlador;