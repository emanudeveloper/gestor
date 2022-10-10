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
module.exports = reciente;