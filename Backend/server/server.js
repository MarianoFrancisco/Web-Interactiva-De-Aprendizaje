const ROLES_LIST = require("../config/roles_list");

module.exports = {
    getIo: (server) => {
        const io = require('socket.io')(server, {
            cors: { origin: 'http://localhost:5173' }
        });
        
        let lobbyUsers = [];
        let claveLobby = '';
        
        io.on('connection', (socket) => {
            console.log('Conectado al socket');
            socket.on('auth', (data) => {
                const { roles } = data;
                if (roles?.includes(ROLES_LIST.Teacher)) {
                    const min = 100000;
                    const max = 999999;
                    claveLobby = toString(Math.floor(Math.random() * (max - min + 1)) + min);
                    lobbyUsers = [];
                    socket.emit('Clave de Lobby', claveLobby)
                }
            })
        
            socket.on('join', (data) => {
                const { clave, user_name } = data;
                if (toString(clave) === claveLobby) {
                    if (!lobbyUsers.includes(user_name)) {
                        lobbyUsers.push(user_name);
                        socket.emit('lobbyUsers', lobbyUsers);
                    } else {
                        socket.emit('joinError', 'Ya estas participante en el juego...');
                    }
                } else {
                    socket.emit('joinError', 'El codigo no existe...');
                }
            });
        
            socket.on('disconnect', (data) => {
                const { user_name } = data;
                const index = lobbyUsers.indexOf(user_name);
                if (index !== -1) {
                    lobbyUsers.splice(index, 1);
                }
                socket.emit('lobbyUsers', lobbyUsers);
            });
        
        });
        return io;
    }
};