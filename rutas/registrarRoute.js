const {Router} = require("express");
const express = require("express");
const rutaRegistrar = Router();
const registrarController = require("../controladores/registrarController.js");
const {verificarInicio} = require('../passport/verficarInicioDeSesion')



rutaRegistrar.use(express.urlencoded({
    extended: true
  }))

  // rutaRegistrar.use(express.json());

rutaRegistrar.get("/registrar", verificarInicio, registrarController.mostrarVista);
rutaRegistrar.post("/registrar", verificarInicio, registrarController.documentoSingle, registrarController.registrarDocumento);//, documento.single('pdf')
rutaRegistrar.post("/registrar/rellenar", registrarController.documentoSingleBuffer, registrarController.rellenar);//, documento.single('pdf')

module.exports = rutaRegistrar;