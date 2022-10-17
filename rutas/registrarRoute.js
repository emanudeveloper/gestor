const {Router} = require("express");
const express = require("express");
const rutaRegistrar = Router();
const registrarController = require("../controladores/registrarController.js");



rutaRegistrar.use(express.urlencoded({
    extended: true
  }))

  // rutaRegistrar.use(express.json());

rutaRegistrar.get("/registrar", registrarController.mostrarVista);
rutaRegistrar.post("/registrar", registrarController.documentoSingle, registrarController.registrarDocumento);//, documento.single('pdf')

module.exports = rutaRegistrar;