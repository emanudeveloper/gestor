var carpetas={};

    let input = document.getElementById("abrirArchivo");
    let imageName = document.getElementById("nombreArchivo")
    const numHojas = document.getElementById("numHojas");
    const fRecepcion = document.getElementById("f_recepcion");
    const f_doc = document.getElementById("f_doc");

    input.addEventListener("change", ()=>{
        let inputImage = document.querySelector("input[type=file]").files[0];

        imageName.innerText = inputImage.name;
        imageName.style="color:white; width:90%"
    })


// function agregar(){
//     var padre = document.getElementById('tarjetas');
//     var tamanio = padre.childNodes.length-1;
//     var nuevaCarpeta = Object.assign(document.createElement('a'), { className: 'tarjeta' });
//     nuevaCarpeta.appendChild(document.createTextNode('Nueva carpeta.'));
//     padre.insertBefore(nuevaCarpeta, padre.childNodes[tamanio]); 
//     var nombreCarpeta = Object.assign(document.createElement('div'),{contenteditable:'true'});
//     nombreCarpeta.appendChild(document.createTextNode("nuevo"));
//     var imagen = Objecto.assing(document.createElement('a'),{className:'tarjeta'});

//     padre.appendChild(nombreCarpeta);
//                     //- a(class="tarjeta" href="archivos"+enlaces[index]) #{index+1} #{val}
//                     // div(contenteditable="true") #{index+1} #{val}
//                     // a(class="tarjeta" href="archivos"+enlaces[index]) 
// }

function agregar(id){
 
    //- var tarjeta = '<a class="tarjeta"> Carpeta Nueva </a>';
    //- var arrayTitulos = "#{carpetas.push('Nueva carpeta')}";
    //- arrayTitulos.push("Nueva carpeta");
    //- alert(arrayTitulos);
    var padre = document.getElementById("tarjetas");
    var tamanio = padre.childNodes.length-1;
    //- div.innerHMTL = div.innerHMTL + div.childNodes[div.childNodes.length-2];
    //- document.getElementById('tarjetas').insertBefore(tarjeta, div.childNodes.length-2);
    //- var parrafo = document.createElement('a').appendChild(document.createTextNode('Nuevo párrafo.'));
    
    // var nuevaCarpeta = Object.assign(document.createElement('a'), { className: 'tarjeta' });
    var nuevaCarpeta = Object.assign(document.createElement('a'), { className: 'tarjeta'});
    nuevaCarpeta.setAttribute("contenteditable","true");
    // nuevaCarpeta.classList.add("nuevaCarpeta");    
    // nuevaCarpeta.appendChild(document.createTextNode('Nueva carpeta.'));
    nuevaCarpeta.appendChild(document.createTextNode('Nueva carpeta.'));

    //- document.getElementById('tarjetas').appendChild(parrafo);//document.getElementById('tarjetas')
    padre.insertBefore(nuevaCarpeta, padre.childNodes[tamanio]); 
    
    //- alert(nuevaCarpeta.getAttribute('class'));
    //- padre.childNodes.length-2    
};


// Autorellenado de formulario

// const btnAbrirArchivo = document.getElementById("abrirArchivo");


input.addEventListener('change',()=>{ //btnAbrirArchivo.addEventListener('change',()=>{
    const url = "/registrar/rellenar";
    const datoFormulario = new FormData();    

    datoFormulario.append('rellenar', true);
    datoFormulario.append('pdf', input.files[0]);
    // console.log(datoFormulario.get("rellenar"));
    // console.log(datoFormulario.get("pdf"));
    
    
    try{
        if(input.files[0]){//btnAbrirArchivo.files[0]
            // console.log("se cargo 1 archivo");
            fetch(url, {
                method:"post",
                body:datoFormulario
            }).then(respuesta=> {
                const texto = respuesta.text();                       
                return texto;

            }).then(texto =>{
                const datos = JSON.parse(texto);
                numHojas.value= datos['numPaginas'];
                
                var date = new Date();
                date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                
                // console.log(date);
                var fechaHora = date.toISOString().slice(0,16);
                // console.log(fechaHora);
                fRecepcion.value = fechaHora;                
                // var nueTexto = texto.substring(0,320);
                var nueTexto = texto;
                // nueTexto =  nueTexto.toLowerCase();
                console.log("Nuevo Texto: ", nueTexto);

    //             const meses = ["ENE","FEB", "MAR", "ABR", "MAY", , "JUN", "JUL", "AGO", "SEP", "SET", "OCT", "NOV", "DIC",
    //         "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "SETIEMBRE",
    //     "OCTUBRE", "NOVIEMBRE", "DICIEMBRE", "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
    // "setiembre", "septiembre", "octubre", "noviembre", "diciembre"];

                const meses = ["ene","feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "set", "oct", "nov", "dic",
                "ene.","feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "set.", "oct.", "nov.", "dic.",
                "enero de", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
                "setiembre", "septiembre", "octubre", "noviembre", "diciembre"];
                // const fecha=[];
                // var fecha = nueTexto.substring(0,320);
                var fecha;// = nueTexto;
                // console .log("Texto fecha: ", fecha);
                // const fechas =[];
                
                // const palabra = `/\s${valor}\s(?=20|10|70|\s|de|del)/mg`;
                meses.forEach((valor)=>{

                    // let index = nueTexto.indexOf(valor);
                    const palabra = new RegExp(`\\s${valor}(?=20|10|70|\\s|de|del)`, 'mi')    //'mg' segundo parametro
                    let index = nueTexto.search(palabra);//valor

                    if(index !=-1){
                        
                        fecha = nueTexto.substring(index-6, index+15).trim();
                        fecha.replace(/[^a-zA-Z0-9 ]/g, "")
                        fecha.replace("de", " ");
                        fecha.replace("del", " ");
                        console.log("fecha:  ", fecha);

                        try{
                            var fDoc = new Date(fecha);                            
                            console.log("Fecha input: ", fDoc);
                            fDoc.setMinutes(fDoc.getMinutes()-fDoc.getTimezoneOffset());
                            fDoc = fDoc.toISOString().slice(0,10);
                            console.log("f doc: ", fDoc);
                            f_doc.value = fDoc;
                        }catch(e){
                            console.log("Error en fecha del Documento: ", e);
                        }

                        
                        // fechas.push(fecha);
                        // console.log("Nº fechas encontradas: ", fechas.length)
                        return true;
                    }                    
                });

                // meses.forEach((valor, indice, arreglo)=>{

                //     let index = fecha.indexOf(valor);

                //     if(index !=-1){
                        
                //         fecha = fecha.substring(index-4, index+10).trim();
                //         fecha.replace(/[^a-zA-Z0-9 ]/g, "")
                //         console.log("fecha:  ", fecha);
                //         return true;
                //     }                    
                // });


                // document.getElementById("numHojas").value = texto.substring(12, texto.indexOf(","));
                // console.log("numpages: ", texto.indexOf("numpages"));
                // console.log("\ncaracter : ", texto.charAt(12));
                // console.log("\nla respuesta se convierte en texto en el frontend", texto)
                
            }).catch(e=>{console.log("error: ", e)});
        }
    }catch (e){
        console.log("error: ", e);
    }        
});



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

    
// function abrirCarpeta(id){
    // arreglo.forEach(function (value,index, array){        
    //     // doc.innerHTML="<p>Hola mundo</p>";
    // })
    // carpeta.style="backgroundColor:red;";
    // id.getAttribute('id');
    //id.getAttribute('id')
    // var doc = document.getElementById(id);
    // alert(id);
    // doc.innerHTML="<p>Hola mundo</p>"; 
    // doc.style="color:black";
// }
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





// const user = {
//     name: "Manz",
//     role: "streamer",
//     life: 99
//   }
  
//   function show(data) {
//     const stars = "⭐".repeat(data.life / 20);
//     return `Nombre: ${data.name} (${data.role}) ${stars}`;
//   }

//   console.log(user);
//   show(user);