
module.exports.iniciaChat = function(application, req, res){
    const dadosForm = req.body

    req.assert('user', 'O username é obrigatório').notEmpty()
    req.assert('user', 'O username deve ter entre 3 e 15 caracteres').len(3, 15)
    
    var erros = req.validationErrors()

    if(erros){
        res.render('index', {validacao: erros})
        return 
    }

    application.get('io').emit('msgNovoUsuario', {
        apelido: dadosForm.user,
        msg: 'entrou no chat'
    })
    res.render('chat', {user: dadosForm.user})
}