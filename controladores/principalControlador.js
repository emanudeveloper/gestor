
const principalControlador = {

}

const carpetas = ["Asesoría Jurídica", "Logística", "Servicios de Salud", 
"Administración", "Inteligencia Sanitaria", "Promoción de la Salud", "Control Institucional", 
"Estadística e Informática", "Laboratorio Referencial R."];

const enlaces =  ["/asesoria-juridica", "/logistica", "/servicios-salud", "/administracion", "/inteligencia-sanitaria", 
"/promocion-salud", "/control-institucional", "/estadistica-informatica", "/laboratorio-referencial-r"];

principalControlador.mostrarVista = function (req, res){
    
    res.render('carpetas.pug', {carpetas, enlaces});
}












// var directorio = document.getElementById('tarjetas');
// var directorios = ["Asesoría Jurídica", "Logística", "Servicios de Salud",
//                     "Administración", "Inteligencia Sanitaria", "Promoción de la Salud",
//                     "Contro Institucional", "Estadística e Informática", "Laboratorio Referencial R."]
// var html = "";

// function insertarDirectorio(){
//     html="";
//     directorios.forEach(function callback(directorio, index, array) {
//         // tu iterador
    
//         html += `<div class="tarjeta" onclick=abrirCarpeta()>${index+1} ${directorio}</div>`
//     });
//     directorio.innerHTML = html;
// }

// function abrirCarpeta(){
//     alert('abriendo');
// }

// insertarDirectorio();






module.exports = principalControlador;