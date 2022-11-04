// require('dotenv').config();
const express = require('express');
const flash = require('connect-flash');
const path = require('path');
// const morgan = require('morgan');
const passport = require('passport');
const sesion = require('express-session');
const pdfParse = require('pdf-parse');

require('./passport/autentificacionLocal');
const app = express();
const port = process.env.PORT || 3000;


//referenciamos a las rutas
const carpetasRoute = require('./rutas/carpetasRoute');
const papeleraRoute = require('./rutas/papeleraRoute');
const recientesRoute = require('./rutas/recientesRoute');
const registrarRoute = require('./rutas/registrarRoute');
const iniciarSesionRoute = require('./rutas/iniciarSesionRoute');
const registrarUsuarioRoute = require('./rutas/registrarUsuarioRoute');

// const exp = require('constants');
//setters
app.set('vistas', path.join(__dirname, 'views'))
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));


app.use(sesion({
  secret:'sesion de mesa de partes',
  resave:false,
  saveUninitialized:false
}));

// //llamamos a la

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.errorDeRegistro = req.flash('errorDeRegistro');
    app.locals.errorDeInicio = req.flash('errorDeInicio');    
    next();
  });

app.use(express.static( path.join(__dirname, 'public')));
app.use('/documentos', express.static( path.join(__dirname, 'documentos')));
// app.use('/doc', express.static(path.join(__dirname, 'documentos')));

// //llamamos a las rutas
app.use(registrarUsuarioRoute);
app.use(iniciarSesionRoute);
app.use(recientesRoute)
app.use(registrarRoute);;
app.use(carpetasRoute);
app.use(papeleraRoute);


app.listen(port, ()=>{
    console.log(`escuchando desde el puerto ${port}`);
})

module.exports = app