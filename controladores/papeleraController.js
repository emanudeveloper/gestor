const path = require('path')

const papeleraController = {

}

papeleraController.mostrarVista = function (req, res){
    
    res.render('papelera.pug');
}

module.exports = papeleraController;