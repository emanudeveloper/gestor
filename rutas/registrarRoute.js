const {Router} = require("express");
const express = require("express")
const rutaRegistrar = Router();
const registrarController = require("../controladores/registrarController.js");


rutaRegistrar.use(express.urlencoded({
    extended: true
  }))


rutaRegistrar.get("/registrar", registrarController.mostrarVista);

rutaRegistrar.post("/registrar", registrarController.registrarDocumento);

module.exports = rutaRegistrar;