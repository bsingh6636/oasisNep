import { Server } from "socket.io"

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ['https://subscriptionnepal.shop', 'https://pagee-kappa.vercel.app','http://localhost:3000', 'http://localhost:3001'],
            credentials: true
        }
    })

    // console.log('newSocket' , io)

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('joinChat', ( {userId , userInfo, id} ) => {
            console.log('user joined chat' , userId , userInfo);
            socket.join(userId);
        });

        socket.on('sendMessage', (message) => {
            console.log('message received', message);
            // socket.broadcast.emit('receiveMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    
}
export default initializeSocket;