const documento = require("../modelos/documentoModel");
const path = require('path');
const multer = require("multer");
const pdfParse = require('pdf-parse');
const PdfExtractor = require('pdf-extractor').PdfExtractor;
const Tesseract = require('tesseract.js')
fs = require('fs');
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
    // console.log("buffer en el servidor", buffer);
    
    // buffer.forEach((valor, clave, an
    // console.log("buffer [25]", buffer.toJSON());
    // console.log("buffer [25]", buffer.toString('utf-8'));
    
    
    fs.writeFile('documentos/BUFFER.pdf', buffer, function (err) {
        if (err) return console.log(err);
        extraerImagenPdf();
        
        console.log('Buffer Almacenado > BUFFER.pdf');
    });

    // const message = Buffer.from(buffer, 'base64').toString('utf-8');
    // let parsedMessage = JSON.parse(message);
    // console.log(message);

    //req.file.buffer
    
    const pdfparseado = pdfParse(buffer).then(resultado=>{
        // console.log("Resultado en el pdf parseado", resultado);    
    res.send(resultado);}).catch(e=>console.log("error: ", e));
        // res.json(JSON.stringify(resultado));}).catch(e=>console.log("error: ", e));
}

function extraerImagenPdf(){
    
    let outputDir = 'documentos',

    pdfExtractor = new PdfExtractor(outputDir, {
        pageRange: [1,1]
        
    });

    pdfExtractor.parse('documentos/BUFFER.pdf')
        .then(function () {//'documentos/BUFFER.pdf'
            console.log('Recursos extraidos, ahora iniciando tesseract');
            convertirImagenATexto();
        }).catch(function (err) {
            console.error('Error: ' + err);
        });
}

function convertirImagenATexto(){
    const ruta = path.join(__dirname,"../", "documentos/page-1.png");
    console.log("Ruta Imagen: ", ruta);
    
    Tesseract.recognize(
        ruta,//'https://tesseract.projectnaptha.com/img/eng_bw.png'
        'spa'
        // ,
        // { 
        //     logger: m => console.log(m)
        // }
    ).then(({ data: { text } }) => {
        console.log(text);
    });  
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
