const documentoModel = require("../modelos/documentoModel.js");
const reciente = {}

reciente.mostrarVista =  async (req, res)=>{
    const documentos = await documentoModel.find({});
    // documentos = JSON.stringify(documentos)
    // res.render('recientes.pug', {documentos, numElementos:documentos.length});
    res.render('recientes.pug', {documentos, tamanio: documentos.length});
    // console.log("mostrando: ", documentos[0].estado)
    // res.render('recientes.pug', {documento:new Date(Date.now())});
}
module.exports = reciente;