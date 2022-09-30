const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

//referenciamos a las rutas
const rutaPrincipal = require('./rutas/principalRoute');
const papeleraRoute = require('./rutas/papeleraRoute');

//setters
app.set('vistas', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

//llamamos a las rutas
app.use(rutaPrincipal);
app.use(papeleraRoute)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=>{
    console.log(`escuchando desde el puerto ${port}`);
})

module.exports = app