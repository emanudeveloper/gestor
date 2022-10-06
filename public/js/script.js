// const menuArchivos = document.getElementById('menuArchivos');
// const archivos = document.getElementById('archivos');
var directorio = document.getElementById('tarjetas');
var directorios = ["Asesoría Jurídica", "Logística", "Servicios de Salud",
                    "Administración", "Inteligencia Sanitaria", "Promoción de la Salud",
                    "Contro Institucional", "Estadística e Informática", "Laboratorio Referencial R."]
var html = "";

// function seleccionar(){

//     // menuArchivos.style.backgroundColor="white";
//     // archivos.style.backgroundColor = "white";
//     menuArchivos.style.backgroundColor ="white";
//     archivos.style.backgroundColor = "white";
//     menuArchivos.firstChild.style.color= "black";
//     // html = 
// }

function insertarDirectorio(){
    html="";
    directorios.forEach(function callback(directorio, index, array) {
        // tu iterador
    
        html += `<div class="tarjeta">${index+1} ${directorio}</div>`
    });
    // directorio.appendChild(`<div class="tarjeta">${directorio}</div>`;    
    directorio.innerHTML = html;
    // console.log("directorio: ", directorio.firstChild.nodeName);
    // console.log("directorio2: ", directorio.children.length);
    // obtenerDirectorios();        
}

insertarDirectorio();

// async function obtenerDirectorios(){

//     let archivo = await window.FileSystemDirectoryReader.readEntries(()=>{})); 
//     console.log(archivo);
// }

