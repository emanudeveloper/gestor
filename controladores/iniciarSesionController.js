const iniciarSessionController = {};

iniciarSessionController.iniciar = (req, res)=>{
    // req.flash('Resultado', 'Mensaje exitoso')
    res.render('registrarUsuario.pug');//req.flash('Resultado', 'Mensaje exitoso')
    console.log('registrando');
}

module.exports = iniciarSessionController;