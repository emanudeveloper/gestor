const documento = require("../modelos/documentoModel");
const path = require('path');
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


registrarController.mostrarVista = (req, res)=>{

    res.render("registrar.pug");
}

registrarController.registrarDocumento =  (req, res)=>{
    
    let nuevoDocumentoModel = new documento(req.body);
    
    
    const {oficina, f_doc} =  req.body;
    
    console.log(nuevoDocumentoModel.f_doc);
    const anio=f_doc.substring(0,4);
    const mes = f_doc.substring(5,7);
    const dia = f_doc.substring(8,10);
    
    const ruta = path.join("documentos", "temporal", req.file.filename);
    console.log(ruta)
    nuevoDocumentoModel.url = ruta;
    
    nuevoDocumentoModel
        .save(nuevoDocumentoModel)
        .then(data=>{
            // console.log(data);
            res.render('registrar.pug');
        })
        .catch(err=>{
            res.status(500).send({
                message:
                  err.message || "No se pudo registrar el documento"
        })});

    // const {oficina, f_doc, pdf} =  req.body;
    // console.log(nuevoDocumentoModel.f_doc);
    // nuevoDocumentoModel.f_doc = new Date(f_doc.substring(0,10), Date.now().toLocaleTimeString());
    // console.log(oficina, anio, mes, dia, req.file.filename);
    // const ruta = path.join(oficina, anio, mes, dia, req.file.filename);
    // const ruta = path.join("documentos", "temporal", req.file.filename);
}

registrarController.rellenar = (req, res)=>{
    console.log("Cuerpo: \n", req.body);
    console.log("Cuerpo: \n", req.query);
    console.log("Cuerpo: \n", req.params);
    // console.log("Cuerpo: \n", req.files.archivoPdf);
    // console.log("Cuerpo: \n", req.body.rellenar);
}

module.exports = registrarController;