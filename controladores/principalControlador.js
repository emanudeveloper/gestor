var arbolCarpeta={};


const fs = require('fs');
const path = require('path');

// Function to get current filenames
// in directory
const rutaArchivo =path.join(__dirname,"../","documentos");

const cbDirectorios = (err, files) => { //, { withFileTypes: true } 
    if (err){
      console.log(err);
      return;
    }
    else {
      console.log("\nCurrent directory filenames:");
  
      files.forEach((file, index) => {
          // console.log(index, file);
          
          // if(file.includes('.pdf')){                
          //     files.splice(index,1);
          // } else {    //     // console.log(`FILE: ${file}`)
          //     console.log(`DIR: ${file}`);
          // }
          try {
                if (fs.statSync(path.join(rutaArchivo, file)).isDirectory()) {

                  console.log(`DIR: ${file}`);
                    // let llave = file;
                    arbolCarpeta[file]="carpeta";  
                    crearArbol(path.join(rutaArchivo, file));

                } else {
                  console.log(`FILE: ${file}`)
                  arbolCarpeta['archivos'].push(file);
                    //   files.splice(index,1);
                }
                // arbolCarpeta.push(file); 
          }
          catch(err) {
              console.log('it does not exist');
          }
          
  
            
          // console.log(index, file['Symbol']);
          
          // for(ext in JSON.parse(file)){
          //     console.log(file[ext]);    
          // }
          
      }       
      )
    }
    console.log(arbolCarpeta);
  }



function crearArbol(ruta) {
    fs.readdir(ruta, cbDirectorios);
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