const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

//referenciamos a las rutas
const rutaPrincipal = require('./rutas/principalRoute');
const papeleraRoute = require('./rutas/papeleraRoute');
const recientesRoute = require('./rutas/recientesRoute');
const exp = require('constants');
//setters
app.set('vistas', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

//llamamos a las rutas
app.use(rutaPrincipal);
app.use(papeleraRoute)
app.use(recientesRoute);
app.use(express.json());
app.use(express.static( path.join(__dirname, 'public')));
app.use('/documentos', express.static( path.join(__dirname, 'documentos')));
console.log(__dirname);
app.use('/doc', express.static(path.join(__dirname, 'documentos')));

app.listen(port, ()=>{
    console.log(`escuchando desde el puerto ${port}`);
})

module.exports = app