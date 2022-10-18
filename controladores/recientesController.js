const documentoModel = require("../modelos/documentoModel.js");
const reciente = {}

reciente.mostrarVista =  async (req, res)=>{
    const documentos = await documentoModel.find({});
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
    
    // console.log(await documentoModel.find({titulo:req.params['buscar']}));
    const buscar = req.params.id;
    console.log("parametros: ", req.params);

    // const documentos =  documentoModel.find({titulo:palabraClave}).then(
    //     data =>{res.render('recientes.pug', {documentos, tamanio: documentos.length});}
    // ).catch(e=>{console.log("error: ", e)});

    
    // const documentos =  documentoModel.find({autor: 'Luis'});
    res.send(`palabra clave:  ${buscar}`);
    // res.render('recientes.pug', {documentos, tamanio: documentos.length});
}

module.exports = reciente;