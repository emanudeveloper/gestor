const documento = require("../modelos/documentoModel");
const path = require('path');
const multer = require("multer");
// const pdfParse = require('pdf-parse');
const PdfExtractor = require('pdf-extractor').PdfExtractor;
const Tesseract = require('tesseract.js')
const pdfjsLib = require('pdfjs-dist');
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

registrarController.registrarDocumento =  async (req, res)=>{
    // console.log(req.body);
    // console.log(req.file);
    const ruta = path.join("documentos/temporal", req.file.filename).replace("\\", "/");
    let nuevoDocumentoModel = new documento(req.body);
    
    
    const {oficina, f_doc} =  req.body;
    
    console.log(nuevoDocumentoModel.f_doc);
    const anio=f_doc.substring(0,4);
    const mes = f_doc.substring(5,7);
    const dia = f_doc.substring(8,10);
    
    
    // console.log("Abrir ruta: ",ruta)
    //await ruta.replace("/\\/g", "/");
    //console.log("cambiando \\ por \/    ", ruta)
    // console.log("\\"); 
    // console.log("/");
    nuevoDocumentoModel.url = ruta.replace("\\", "/");

    // console.log("Insertando DOC: ", nuevoDocumentoModel.url);
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
    const datos={};
    // let numPaginas;

    if(!req.file){
        res.status(400);
        res.end();
    }
    
    const buffer = req.file.buffer;
    // console.log("buffer en el servidor", buffer);
    
    // buffer.forEach((valor, clave, an
    // console.log("buffer [25]", buffer.toJSON());
    // console.log("buffer [25]", buffer.toString('utf-8'));
    
    
    fs.writeFile('documentos/BUFFER.pdf', buffer,  function (err) {
        if (err) return console.log(err);
        console.log('Buffer Almacenado > BUFFER.pdf');
        
        // const promesa = new Promise((resolve, reject) => {
        //     resolve(extraerImagenPdf());
        //   });

        // promesa.then((texto)=>{
        //     // const texto = convertirImagenATexto();
        //     console.log(texto);
        //     res.send("datos devueltos del servidor"); }
        // );
        
        //.then(()=>{res.send("datos devueltos del servidor"); });
          
          //.then(()=>{res.send("respuesta enviada")})
         
        // console.log("fecha: ", fecha);
        let outputDir = 'documentos',

        pdfExtractor = new PdfExtractor(outputDir, {
            pageRange: [1,1]        
        });

        pdfExtractor.parse('documentos/BUFFER.pdf')
            .then(function () {//'documentos/BUFFER.pdf'
                console.log('Imagen extraida');  
                const ruta = path.join(__dirname,"../", "documentos/page-1.png");
        console.log("Ruta Imagen: ", ruta);
 
        pdfjsLib.getDocument(buffer).promise.then(function (doc) {
            // numPaginas = doc.numPages;
            datos.numPaginas = doc.numPages;
            // var numPages = doc.numPages;
            console.log('Numero de paginas: ' + datos.numPaginas);
        });

        Tesseract.recognize(
            ruta,
            'spa'
            // ,
            // { 
            //     logger: m => console.log(m)
            // }
        ).then(({ data: { text } }) => {

            // const meses = ["ENE","FEB", "MAR", "ABR", "MAY", , "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

            // meses.forEach((valor, indice, arreglo)=>{

            //     const index = text.indexOf(valor);

            //     if(index !=-1){
                    
            //         const fecha = text.substring(index-4, index+10).trim();
            //         fecha.replace(/[^a-zA-Z0-9 ]/g, "")
            //         console.log(index, ": ", fecha);
            //         // text=fecha;                
            //         datos.fecha = fecha;
            //         // return JSON.stringify(datos);
            //         return datos;
            //     }
            //     // 
            datos.texto = text;
            // text.concat(numPaginas);
            console.log("Texto extraido de imagen: ", text);
            return datos;
            
            // return JSON.stringify(datos);
        }).then(texto=>{res.send(texto)});
        

        }).catch(function (err) {
            console.error('Error: ' + err);
        });
    });    
}


module.exports = registrarController;