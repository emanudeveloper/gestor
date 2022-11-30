var carpetas={};

    let input = document.getElementById("abrirArchivo");
    let imageName = document.getElementById("nombreArchivo")
    const numHojas = document.getElementById("numHojas");
    const fRecepcion = document.getElementById("f_recepcion");
    const f_doc = document.getElementById("f_doc");
    const titulo = document.getElementById("titulo");
    const descripcion = document.getElementById("descripcion");
    const ruta = document.getElementById("ruta");
    

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

function iniciarComponentes(){
    // let date = new Date();
    // date = date.toISOString().slice(0,10);
    // console.log("fecha maxima", date);    
    // fRecepcion.setAttribute('max', date);
    // f_doc.setAttribute('max', date);
    
    // console.log(window.location.href);
    // console.log(window.location.protocol);
    // console.log(window.location.host);
    // console.log(window.location.hostname);
    // console.log(window.location.port);
    // console.log(window.location.pathname);
    // console.log(window.location.origin);        
}

iniciarComponentes();

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
    nuevaCarpeta.appendChild(document.createTextNode(`${tamanio} Nueva carpeta`));

    //- document.getElementById('tarjetas').appendChild(parrafo);//document.getElementById('tarjetas')
    padre.insertBefore(nuevaCarpeta, padre.childNodes[tamanio]); 
    
    //- alert(nuevaCarpeta.getAttribute('class'));
    //- padre.childNodes.length-2    
};

function abrirCarpeta(elemento){
    console.log("diste click en la carpeta: ", elemento);
    let rutaCarpeta = ruta.innerText.concat('/').concat(elemento);
    ruta.innerText = rutaCarpeta;    
    console.log("Ruta: ", rutaCarpeta);

    const formulario = new FormData();
    formulario.append('rutaCarpeta', rutaCarpeta);    
    // var parametro = encodeURIComponent(rutaCarpeta);
    // var url = new URL('/carpetas/');
    // url.searchParams.append("ruta", nuevaCarpeta);
    // console.log("ruta solicitada: ", url);

    //`/carpetas?ruta=${parametro}`
    // fetch(`/carpetas?ruta=${rutaCarpeta}`,
    fetch(`/carpetas/:nuevaRuta?ruta=${rutaCarpeta}`, {// + new URLSearchParams({rutaCarpeta:rutaCarpeta}).toString()
        method:'get',
        // headers:{rutaCarpeta}
        // mode: "no-cors",
        // headers: { "Content-Type": "application/json" },
        // params: { rutaCarpeta: rutaCarpeta},   // host:'',
        // body:formulario
    }).then((data)=>{return data.text()}).then((datos)=>{console.log("datos: ", datos)}).catch(e=>console.log("error: ", e));

}

// Autorellenado de formulario

// const btnAbrirArchivo = document.getElementById("abrirArchivo");

// input.addEventListener("change", ()=>{
//     let inputImage = document.querySelector("input[type=file]").files[0];

//     imageName.innerText = inputImage.name;
//     imageName.style="color:white; width:90%"
// })


input.addEventListener('change',()=>{ 
    let inputImage = document.querySelector("input[type=file]").files[0];
    imageName.innerText = inputImage.name;
    imageName.style="color:white; width:90%"

    var date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());                
    var fechaHora = date.toISOString().slice(0,16);
    fRecepcion.value = fechaHora;                
    titulo.value = "";
    descripcion.value = "";
    numHojas.value=0;
    f_doc.value="";

    const url = "/registrar/rellenar";
    const datoFormulario = new FormData();    

    datoFormulario.append('rellenar', true);
    datoFormulario.append('pdf', input.files[0]);
    // console.log(datoFormulario.get("rellenar"));
    // console.log(datoFormulario.get("pdf"));
    
    
    try{
        if(input.files[0]){//btnAbrirArchivo.files[0]
            // console.log("se cargo 1 archivo");
            fetch(url, {//fetch
                method:"post", // host:"https://registro-mesa-partes.herokuapp.com",
                body:datoFormulario
            }).then(respuesta=> {
                const texto = respuesta.text();                       
                return texto;

            }).then(texto =>{
                console.log("texto: ", texto);
                const datos = JSON.parse(texto);
                numHojas.value= datos['numPaginas'];
                

                var nueTexto = texto.substring(0,500);
                // var nueTexto = texto;
                nueTexto = nueTexto.toLowerCase();
                // nueTexto =  nueTexto.toLowerCase();
                console.log("Nuevo Texto: ", nueTexto);
                
                let fecha;// = nueTexto;
                let nuevaFecha;
                let descripcionValor="";
                let tituloValor="";
                let index;
                let regex;
       
                regex = /(visto|considerando|asunto|asuntos|vistos|asuntos.|asunto.)/i;
                index = nueTexto.search(regex);
                descripcionValor = descripcionValor.concat(nueTexto.substring(index, index+350),'...');
                descripcionValor = descripcionValor.replace(/[^\w\s\%\/\-\.\u00D1\u00F1\u00C1\u00C9\u00CD\u00D3\u00DA\u00DC\u00E1\u00E9\u00ED\u00F3\u00FA\u00FC|\n|-]+/gi,'');
                console.log("titulo: ", descripcionValor);
                descripcion.value = descripcionValor;

                tituloValor = nueTexto.substring(index-110, index-32);
                tituloValor = tituloValor.replace(/[^\w\s\/\-\.\u00D1\u00F1\u00C1\u00C9\u00CD\u00D3\u00DA\u00DC\u00E1\u00E9\u00ED\u00F3\u00FA\u00FC|\n|-]+/gi,'');
                titulo.value = tituloValor;
                
                regex = /(ene|feb|mar|abr|may|jun|jul|ago|sep|set|oct|nov|dic|ene.|feb.|mar.|abr.|may.|jun.|jul.|ago.|sep.|set.|oct.|nov.|dic.|enero|febrero|marzo|abril|mayo|junio|julio|agosto|setiembre|septiembre|octubre|noviembre|diciembre)/i; 
                index = nueTexto.search(regex);
     
                if(index !=-1){
                        
                            fecha = nueTexto.substring(index-10, index+20).trim();// -5   +14
                            console.log("fecha: ", fecha);

                            nuevaFecha = fecha.replace(/([^a-z0-9]|de|del)/gi, '');
                            console.log("Nueva fecha:  ", nuevaFecha);              

                            nuevaFecha = nuevaFecha.match(/[0-9]{1,2}[a-z]+[0-9]{2,4}/gi)[0];
                            console.log("Nueva fecha:  ", nuevaFecha);   

                            nuevaFecha = nuevaFecha.replace(/[a-z]+/i, function(mes){
                                console.log("mes: ", mes);
                                
                                if(mes.includes("ene")){
                                    return " january ";
                                }else if(mes.includes("abr")){
                                    return " april ";
                                }else if(mes.includes("ago")){
                                    return " august ";
                                }else if(mes.includes("set")){
                                    return " september ";
                                }else if(mes.includes("dic")){
                                    return " december ";
                                }
                                
                                return " " + mes + " ";
                                

                            });
                            
                            try{
                                var fDoc = new Date(nuevaFecha);                            
                                console.log("1. Fecha Doc: ", fDoc);
                                fDoc.setMinutes(fDoc.getMinutes()-fDoc.getTimezoneOffset());
                                fDoc = fDoc.toISOString().slice(0,10);
                                console.log("2. fecha doc: ", fDoc);
                                f_doc.value = fDoc;
                                // return true;
                            }catch(e){
                                console.log("Error en fecha del Documento: ", e);
                            }
        
                        }   

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