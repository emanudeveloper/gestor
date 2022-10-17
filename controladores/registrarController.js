const documento = require("../modelos/documentoModel");
const path = require('path');
const registrarController = {}

registrarController.mostrarVista = (req, res)=>{

    res.render("registrar.pug");
}

registrarController.registrarDocumento = async (req, res)=>{
    
    const nuevoDocumento =  req.body;
    const {oficina, f_doc, pdf} = req.body;
    const anio=f_doc.substring(0,4);
    const mes = f_doc.substring(5,7);
    // console.log(oficina, f_doc, pdf);
    const ruta = path.join(oficina, anio, mes, pdf);
    console.log(ruta);
    nuevoDocumento.url = ruta;
    // console.log(oficina, anio, mes, pdf);
    // console.log(nuevoDocumento);
    
    try{
        const nuevoDocumentoModel = new documento();
        console.log(nuevoDocumento);    
        await nuevoDocumentoModel.save(nuevoDocumento);
        res.render('registrar.pug');
        // res.status(200);
    }catch(e){
        console.log("Error:  ", e);
    }
}

module.exports = registrarController;