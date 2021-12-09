const app = require('./config/server')

const server = app.listen(80, function(){
    console.log('Servidor rodando')
})

const io = require('socket.io')(server);

app.set('io', io)

io.on('connection', function(socket){
    console.log('Usuário conectou')

    socket.on('disconnect', function(){
        console.log('Usuário desconectou')
    })

    socket.on('enviarMsgServidor', function(data){
        
        socket.emit('msgNovoUsuario', {
            apelido: data.apelido,
            msg: data.msg
        })
        socket.broadcast.emit('msgNovoUsuario', {
            apelido: data.apelido,
            msg: data.msg
        })

        if(parseInt(data.apelido_atualizado_clientes) == 0){
            socket.emit('participantesCliente', {
                apelido: data.apelido,
            })
            socket.broadcast.emit('participantesCliente', {
                apelido: data.apelido,
            })
        }


    })
})

