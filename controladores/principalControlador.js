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

module.exports = principalControlador;