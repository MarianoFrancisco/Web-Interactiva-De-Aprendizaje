const ROLES_LIST = require("../config/roles_list");

module.exports = {
    getIo: (server) => {
        const io = require('socket.io')(server, {
            cors: { origin: 'http://localhost:5173' }
        });
        
        const lobbyUsers = [];
        let claveLobby = 0;
        
        io.on('connection', (socket) => {
            console.log('Conectado al socket');
            socket.on('auth', (data) => {
                const { rol } = data;
                if (rol === ROLES_LIST.Teacher) {
                    const min = 100000;
                    const max = 999999;
                    claveLobby = Math.floor(Math.random() * (max - min + 1)) + min;
                    lobbyUsers = [];
                    socket.emit('Clave de Lobby', claveLobby)
                }
            })
        
            socket.on('join', (data) => {
                const { clave, user_name } = data;
                if (clave === claveLobby) {
                    lobbyUsers.push(user_name);
                    io.emit('lobbyUsers', lobbyUsers);
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
                io.emit('lobbyUsers', lobbyUsers);
            });
        
        });
        return io;
    }
};