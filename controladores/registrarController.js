const documento = require("../modelos/documentoModel");
const path = require('path');
const multer = require("multer");
const pdfParse = require('pdf-parse');
const registrarController = {}

//para guardar en buffer
const storageRAM = multer.memoryStorage();
const docBuffer = multer({storage:storageRAM});

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

registrarController.documentoSingle=docMulter.single('pdf');
registrarController.documentoSingleBuffer = docBuffer.single('pdf');

registrarController.registrarDocumento =  (req, res)=>{
    console.log(req.body);
    console.log(req.file);

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




registrarController.mostrarVista = (req, res)=>{

    res.render("registrar.pug");
}

registrarController.rellenar = (req, res)=>{
    // console.log("Cuerpo recibido en el servidor: \n", req.body);    
    // console.log("Archivo recibido en el servidor: \n", req.file);    
   
    if(!req.file){
        res.status(400);
        res.end();
    }
    
    const buffer = req.file.buffer;
    console.log("buffer en el servidor", buffer);
    //req.file.buffer
    
    const pdfparseado = pdfParse(buffer).then(resultado=>{
        // console.log("Resultado en el pdf parseado", resultado);    
        res.send(resultado);}).catch(e=>console.log("error: ", e));
        // res.json(JSON.stringify(resultado));}).catch(e=>console.log("error: ", e));
}

module.exports = registrarController;








// registrarController.registrarDocumento =  (req, res)=>{
//     console.log(req.body);
//     console.log(req.file);
    
//     let nuevoDocumentoModel = new documento(req.body);
    
    
//     const {oficina, f_doc} =  req.body;
    
//     console.log(nuevoDocumentoModel.f_doc);
//     const anio=f_doc.substring(0,4);
//     const mes = f_doc.substring(5,7);
//     const dia = f_doc.substring(8,10);
    
//     const ruta = path.join("documentos", "temporal", req.file.filename);
//     console.log(ruta)
//     nuevoDocumentoModel.url = ruta;
    
//     nuevoDocumentoModel
//         .save(nuevoDocumentoModel)
//         .then(data=>{
//             // console.log(data);
//             res.render('registrar.pug');
//         })
//         .catch(err=>{
//             res.status(500).send({
//                 message:
//                   err.message || "No se pudo registrar el documento"
//         })});

// }
