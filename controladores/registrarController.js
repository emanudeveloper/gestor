const documento = require("../modelos/documentoModel");
const path = require('path');
<<<<<<< HEAD
const registrarController = {}
=======
const multer = require("multer");
const registrarController = {}

const storage = multer.diskStorage({
    destination:function(req, file ,cb){
        
        cb(null, path.join('documentos', 'temporal'));    
    },
    filename:function(req, file, cb){
        console.log(file);
        // let nombreArchivo = (new Date).toISOString().slice(0, 10);
        // console.log(nombreArchivo);
        // nombreArchivo = nombreArchivo.concat("-", file.originalname);
        // console.log(nombreArchivo);
        // cb(null, nombreArchivo);
        // cb(null, `${Date.now()}-${file.originalname}`);
        cb(null, file.originalname);
        
    }
    });

    const docMulter = multer({storage:storage});

registrarController.documentoSingle=docMulter.single('pdf')

>>>>>>> a5ea1b4bfd9abcadf04d67d4b64392786f541df4

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

registrarController.registrarDocumento =  (req, res)=>{
    
    let nuevoDocumentoModel = new documento(req.body);
    
<<<<<<< HEAD
    const {oficina, f_doc, pdf} = req.body;
    const anio=f_doc.substring(0,4);
    const mes = f_doc.substring(5,7);
    const ruta = path.join(oficina, anio, mes, pdf);
    nuevoDocumentoModel.url = ruta;
=======
    // const {oficina, f_doc, pdf} =  req.body;
    const {oficina, f_doc} =  req.body;
    // console.log(nuevoDocumentoModel.f_doc);
    // nuevoDocumentoModel.f_doc = new Date(f_doc.substring(0,10), Date.now().toLocaleTimeString());
    console.log(nuevoDocumentoModel.f_doc);
    const anio=f_doc.substring(0,4);
    const mes = f_doc.substring(5,7);
    const dia = f_doc.substring(8,10);
    // console.log(oficina, anio, mes, dia, req.file.filename);
    // const ruta = path.join(oficina, anio, mes, dia, req.file.filename);
    // const ruta = path.join("documentos", "temporal", req.file.filename);
    const ruta = path.join("documentos", "temporal", req.file.filename);
    console.log(ruta)
    nuevoDocumentoModel.url = ruta;
    
>>>>>>> a5ea1b4bfd9abcadf04d67d4b64392786f541df4
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

<<<<<<< HEAD
    // console.log(req.file);
    // const files = req.file;    
=======
    // const files = req.file;


    
>>>>>>> a5ea1b4bfd9abcadf04d67d4b64392786f541df4
    //{dest: 'documentos/' }

    // res.send(req.file);
}

<<<<<<< HEAD
// module.exports = registrarController;
module.exports = registrarController;
=======
module.exports = registrarController;
>>>>>>> a5ea1b4bfd9abcadf04d67d4b64392786f541df4
