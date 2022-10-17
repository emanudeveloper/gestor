const documento = require("../modelos/documentoModel");
const path = require('path');
const registrarController = {}

registrarController.mostrarVista = (req, res)=>{

    res.render("registrar.pug");
}

registrarController.registrarDocumento = (req, res)=>{
    // let nuevoDocumentoModel = new documento({
    //     pdf : req.body.pdf,
    // f_recepcion : req.body.f_recepcion,
    // titulo : req.body.titulo,
    // f_doc : req.body.f_doc,
    // hojas : req.body.hojas,
    // autor : req.body.autor,
    // descripcion : req.body.descripcion,
    // f_remision : req.body.f_remision,
    // oficina : req.body.oficina
    
    // });
    // url : ruta

    let nuevoDocumentoModel = new documento(req.body);
    
    const {oficina, f_doc, pdf} = req.body;
    const anio=f_doc.substring(0,4);
    const mes = f_doc.substring(5,7);
    const ruta = path.join(oficina, anio, mes, pdf);

    nuevoDocumentoModel.url = ruta;
    nuevoDocumentoModel
        .save(nuevoDocumentoModel)
        .then(data=>{
            res.render('registrar.pug');
        })
        // .catch(err=>{
        //     res.status(500).send({
        //         message:
        //           err.message || "No se pudo registrar el documento"
        // })});


    const nuevoDocumento={};
    
}

module.exports = registrarController;