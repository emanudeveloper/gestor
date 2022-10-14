const {Router} = require("express");
const rutaRegistrar = Router();
const registrarController = require("../controladores/registrarController.js");

rutaRegistrar.get("/agregar", registrarController.mostrarVista);

module.exports = rutaRegistrar;