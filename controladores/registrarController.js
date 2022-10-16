
const registrarController = {}

registrarController.mostrarVista = (req, res)=>{

    res.render("registrar.pug");
}

registrarController.registrarDocumento = (req, res)=>{
    const {titulo, autor, f_doc, pdf} =  req.body;
   
    console.log(titulo, autor, f_doc, pdf);
    res.status(200);
    res.render('registrar.pug');
}

module.exports = registrarController;