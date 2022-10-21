// require('dotenv').config();
const express = require('express');
const flash = require('connect-flash');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const sesion = require('express-session')

require('./passport/autentificacionLocal');
const app = express();
const port = process.env.PORT || 3000;

//referenciamos a las rutas
const carpetasRoute = require('./rutas/carpetasRoute');
const papeleraRoute = require('./rutas/papeleraRoute');
const recientesRoute = require('./rutas/recientesRoute');
const registrarRoute = require('./rutas/registrarRoute');
const iniciarSesionRoute = require('./rutas/iniciarSesionRoute');
// const exp = require('constants');
//setters
app.set('vistas', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

//llamamos a las rutas
app.use(carpetasRoute);
app.use(papeleraRoute)
app.use(recientesRoute);
app.use(registrarRoute);
app.use(iniciarSesionRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(sesion({
  secret:'sesion de mesa de partes',
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash);
app.use((req, res, next) => {
    res.locals.errors = req.flash("error");
    res.locals.successes = req.flash("success");
    next();
  });
// app.use(express.urlencoded({extended: true}));//{extended:false}
app.use(express.static( path.join(__dirname, 'public')));
app.use('/documentos', express.static( path.join(__dirname, 'documentos')));
// app.use('/doc', express.static(path.join(__dirname, 'documentos')));

app.listen(port, ()=>{
    console.log(`escuchando desde el puerto ${port}`);
})

module.exports = app