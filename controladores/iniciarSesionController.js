const iniciarSessionController = {};

iniciarSessionController.iniciar = (req, res)=>{
    // req.flash('Resultado', 'Mensaje exitoso')
    res.render('iniciarSesion.pug');//req.flash('Resultado', 'Mensaje exitoso')
}

module.exports = iniciarSessionController;