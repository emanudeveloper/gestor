const documentoModel = require("../modelos/documentoModel.js");
const reciente = {}

reciente.mostrarVista =  async (req, res)=>{
    const documentos = await documentoModel.find({}).sort({f_recepcion:-1});
    
    // console.log(documentos);
    // console.log(documentos[3]);
    // console.log(documentos[3].autor);
    // documentos = JSON.stringify(documentos)
    // res.render('recientes.pug', {documentos, numElementos:documentos.length});
    res.render('recientes.pug', {documentos, tamanio: documentos.length});
    // console.log("mostrando: ", documentos[0].estado)
    // res.render('recientes.pug', {documento:new Date(Date.now())});
}

reciente.buscarDocumentos =  (req, res)=>{
    const palabra = req.query.palabra;
    // documentoModel.find({titulo:palabra});
    // const buscar = req.query.palabra;
    // console.log("parametros: ", req.query);
    // console.log("parametros.buscar: ", palabra);

    //const documentos = 
    
    const busqueda = "/" + `${palabra}` + "/";
    // console.log(busqueda);
    // documentoModel.find({titulo:palabra}).sort({f_recepcion:-1}).then(
        documentoModel.find({titulo:{$regex:`${palabra}`, $options:'i'}}).sort({f_recepcion:-1}).then(
        
        documentos =>{
            // console.log(documentos);
            // console.log(documentos.length);
            res.render('recientes.pug', {documentos, tamanio: documentos.length});
        }
    ).catch(e=>{console.log("error: ", e)});

    
    // const documentos =  documentoModel.find({autor: 'Luis'});
    // res.send(`palabra clave:  ${palabra}`);
    // res.render('recientes.pug', {documentos, tamanio: documentos.length});
}



module.exports = reciente;