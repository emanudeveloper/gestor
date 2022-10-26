const {Router} = require("express");
const express = require("express");
const rutaRegistrar = Router();
<<<<<<< HEAD
// const registrarController = require("../controladores/registrarController.js");
const registrarController = require("../controladores/registrarController");
=======
const registrarController = require("../controladores/registrarController.js");
const {verificarInicio} = require('../passport/verficarInicioDeSesion')


>>>>>>> a5ea1b4bfd9abcadf04d67d4b64392786f541df4

rutaRegistrar.use(express.urlencoded({
    extended: true
  }))

  // const multer = require("multer");

  // const storage = multer.diskStorage({
  //   destination:function(req, file ,cb){
  //       cb(null, 'documentos');    
  //   },
  //     filename:function(req, file, cb){
  //         console.log(file);
  //         cb(null, `${file.originalname}`);
  //     }
  //   });

  //   const documento = multer({storage:storage});
  // rutaRegistrar.use(express.json());

<<<<<<< HEAD
rutaRegistrar.get("/registrar", registrarController.mostrarVista);
rutaRegistrar.post("/registrar", registrarController.docMulterSingle, registrarController.registrarDocumento);//, documento.single('pdf')
// rutaRegistrar.post("/registrar", documento.single('pdf'), registrarController.registrarDocumento);//, documento.single('pdf')
=======
rutaRegistrar.get("/registrar", verificarInicio, registrarController.mostrarVista);
rutaRegistrar.post("/registrar", verificarInicio, registrarController.documentoSingle, registrarController.registrarDocumento);//, documento.single('pdf')
>>>>>>> a5ea1b4bfd9abcadf04d67d4b64392786f541df4

module.exports = rutaRegistrar;