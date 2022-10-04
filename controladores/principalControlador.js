// const path = require('path')

const principalControlador = {

}

principalControlador.mostrarVista = function (req, res){
    // res.send('ruta /')
    
    // res.sendFile(path.join(__dirname, '../', 'views', 'archivo.html'));
    res.render('carpetas.pug');
}

module.exports = principalControlador;