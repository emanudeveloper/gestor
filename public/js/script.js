// var directorio = document.getElementById('tarjetas');
// var directorios = ["Asesoría Jurídica", "Logística", "Servicios de Salud",
//                     "Administración", "Inteligencia Sanitaria", "Promoción de la Salud",
//                     "Contro Institucional", "Estadística e Informática", "Laboratorio Referencial R."]
// let html;
// let idNum="";
// let arreglo=[];


//  function insertarDirectorio(){
    
//     html="";
//     idNum=""; 
//     directorios.forEach(function callback(carpeta, index, array) {
                
//         idNum = "carp".concat(`${index}`);
//         html += `<a id=${idNum} href="" onclick=abrirCarpeta(this.id) class="tarjeta">${index+1}  ${carpeta} </a>`;
//     });
//     directorio.innerHTML = html;
// }

    
function abrirCarpeta(id){
    // arreglo.forEach(function (value,index, array){        
    //     // doc.innerHTML="<p>Hola mundo</p>";
    // })
    // carpeta.style="backgroundColor:red;";
    // id.getAttribute('id');
    //id.getAttribute('id')
    var doc = document.getElementById(id);
    alert(id);
    // doc.innerHTML="<p>Hola mundo</p>"; 
    // doc.style="color:black";
}
//insertarDirectorio();













// arreglo.push(idNum);
        // html += `<a id=${idNum} href="/papelera" onclick=abrirCarpeta(this.id)><div class="tarjeta">${index+1}  ${carpeta} </div></a>`;


    // directorio.appendChild(`<div class="tarjeta">${directorio}</div>`;     <a id="carp${index+1}"> </a>
    // directorio.innerHTML = html;
    // console.log("directorio: ", directorio.firstChild.nodeName);
    // console.log("directorio2: ", directorio.children.length);
    // obtenerDirectorios();        




// const  
// function seleccionar(){

//     // menuArchivos.style.backgroundColor="white";
//     // archivos.style.backgroundColor = "white";
//     menuArchivos.style.backgroundColor ="white";
//     archivos.style.backgroundColor = "white";
//     menuArchivos.firstChild.style.color= "black";
//     // html = 
// }


// async function obtenerDirectorios(){

//     let archivo = await window.FileSystemDirectoryReader.readEntries(()=>{})); 
//     console.log(archivo);
// }

