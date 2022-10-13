
const fs = require('fs');
const path = require('path');

const rutaArchivo =path.join(__dirname,"../","documentos");

var arbolCarpeta={
  archivos:[]
};

// const cbDirectorios="";

async function crearArbol(ruta) {
    await fs.readdir(ruta, (err, files) => { //, { withFileTypes: true } 
  
      // console.log(rutaArchivo);
        if (err){
          // console.log(err);
          return;
        }
        else {     
      
           files.forEach((file, index) => {
              
              
              // if(file.includes('.pdf')){                
              //     files.splice(index,1);
              // } else {    //     // console.log(`FILE: ${file}`)
              //     console.log(`DIR: ${file}`);
              // }
              try {
                    
                    let nuevaRuta= path.join(rutaArchivo, file);//rutaArchivo
                    if ( fs.statSync(nuevaRuta).isDirectory()) {
                      console.log(true)
                      // console.log(`DIR: ${file}`);
                      // console.log('Ruta', nuevaRuta);
                        // let llave = file;
                        // arbolCarpeta.carpeta={'tipo':"carpeta"};  
                        var nuevaCarpeta = {};
                        nuevaCarpeta[file] = {};
                        arbolCarpeta['carpetas']={...arbolCarpeta['carpetas'], ...nuevaCarpeta};
                        console.log("RutaCarpeta: ", nuevaRuta);
                        console.log("Carpeta: ", file);
                        // return  crearArbol(nuevaRuta);
    
                    } else {
                      console.log(false)
                      // console.log(`FILE: ${file}`)
                      // arbolCarpeta['archivos'] = [];
                      arbolCarpeta['archivos'].push(file);
                      console.log("RutaArchivo: ", nuevaRuta);
                      console.log("Archivo: ", file);
                        //   files.splice(index,1);
                    }
                    // arbolCarpeta.push(file); 
              }
              catch(err) {
                  // console.log('it does not exist');
              }
              
      
                
              // console.log(index, file['Symbol']);
              
              // for(ext in JSON.parse(file)){
              //     console.log(file[ext]);    
              // }
              
          })
        }
        console.log(arbolCarpeta);
        return arbolCarpeta;
        
      });
}

crearArbol(rutaArchivo);


const principalControlador = {
}

const carpetas = ["Asesoría Jurídica", "Logística", "Servicios de Salud", 
"Administración", "Inteligencia Sanitaria", "Promoción de la Salud", "Control Institucional", 
"Estadística e Informática", "Laboratorio Referencial R."];

const enlaces =  ["/asesoria-juridica", "/logistica", "/servicios-salud", "/administracion", "/inteligencia-sanitaria", 
"/promocion-salud", "/control-institucional", "/estadistica-informatica", "/laboratorio-referencial-r"];


// let fs = require('fs');
// fs.readdir('../documentos/LOGISTICA/2022/octubre');

principalControlador.mostrarVista = function (req, res){
    
    res.render('carpetas.pug', {carpetas, enlaces});
}

module.exports = principalControlador;