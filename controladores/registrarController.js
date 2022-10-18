const documento = require("../modelos/documentoModel");
const path = require('path');
const registrarController = {}

const multer = require("multer");

const storage = multer.diskStorage({
  destination:function(req, file ,cb){
      cb(null, 'documentos');    
  }
  ,
    filename:function(req, file, cb){
        // console.log(file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

//   const documento = multer({storage:storage});
const docMulter = multer({storage:storage});
registrarController.docMulterSingle = docMulter.single('pdf');

registrarController.mostrarVista = (req, res)=>{

    res.render("registrar.pug");
}

registrarController.registrarDocumento = (req, res)=>{
    
    let nuevoDocumentoModel = new documento(req.body);
    
    const {oficina, f_doc, pdf} = req.body;
    const anio=f_doc.substring(0,4);
    const mes = f_doc.substring(5,7);
    const ruta = path.join(oficina, anio, mes, pdf);
    nuevoDocumentoModel.url = ruta;
    nuevoDocumentoModel
        .save(nuevoDocumentoModel)
        .then(data=>{
            console.log(data);
            res.render('registrar.pug');
        })
        .catch(err=>{
            res.status(500).send({
                message:
                  err.message || "No se pudo registrar el documento"
        })});

    // console.log(req.file);
    // const files = req.file;    
    //{dest: 'documentos/' }

    res.send(req.file);
}

// module.exports = registrarController;
module.exports = registrarController;
